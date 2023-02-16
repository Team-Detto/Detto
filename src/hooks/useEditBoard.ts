import { useCallback, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { firebaseEditProjectRequest } from 'apis/boardService';
import { useModal, useToastPopup } from 'hooks';
import { EditType } from 'types/write/writeType';
import {
  contentValidation,
  deadlineValidation,
  periodValidation,
  positionValidation,
  titleValidation,
} from 'utils/validation';

const useEdtiBoard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const editRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [editFormValue, setEditFormValue] = useState(state);

  const { isOpen, handleModalStateChange } = useModal(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const handleCheckValidationButtonClick = useCallback(() => {
    const markdownText = editRef.current.getInstance().getMarkdown();

    const isTitleValid = titleValidation(editFormValue.title);
    const isContentValid = contentValidation(markdownText);
    const isPositionValid = positionValidation(editFormValue.positions);
    const isPeriodValid = periodValidation(
      editFormValue.startDate,
      editFormValue.endDate,
    );
    const isDeadlineValid = deadlineValidation(
      editFormValue.deadline,
      TodayDate,
    );

    if (!isTitleValid) {
      handleToastPopup('타이틀 길이는 1자 이상 40자 이하로 작성해주세요.');
      return;
    }
    if (!isPositionValid) {
      handleToastPopup('포지션을 최소 1개 이상 선택해주세요.');
      return;
    }
    if (!isPeriodValid) {
      handleToastPopup('시작 날짜가 종료 날짜보다 늦을 수 없습니다.');
      return;
    }
    if (!isDeadlineValid) {
      handleToastPopup('마감 날짜는 오늘 이후로 설정해주세요.');
      return;
    }
    if (!isContentValid) {
      handleToastPopup('내용 길이는 1자 이상 2000자 이하로 작성해주세요.');
      return;
    }
    handleModalStateChange();

    return;
  }, [editFormValue]);

  const handleEditProjectButtonClick = async () => {
    const markdownText = editRef.current.getInstance().getMarkdown();

    if (!params.id) {
      return;
    }

    await firebaseEditProjectRequest(
      params.id,
      editFormValue,
      markdownText,
      imageRef.current.files[0],
    );
    navigate('/', {
      replace: true,
    });
  };

  const handleAddThumbnailImage = () => {
    imageRef.current.click();
  };

  const handleFormValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const isPosition: boolean = [
        'planner',
        'designer',
        'frontend',
        'backend',
      ].some((v: string) => v === name);
      if (isPosition) {
        setEditFormValue((prev: EditType.EditFormType) => {
          return {
            ...prev,
            positions: {
              ...prev.positions,
              [name]: Number(value),
            },
          };
        });
        return;
      }
      setEditFormValue((prev: EditType.EditFormType) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setEditFormValue],
  );

  return {
    isOpen,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    editFormValue,
    setEditFormValue,
    handleModalStateChange,
    handleFormValueChange,
    handleAddThumbnailImage,
    handleEditProjectButtonClick,
    handleCheckValidationButtonClick,
  };
};

const TIME_ZONE = 3240 * 10000;
const TodayDate = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];

export default useEdtiBoard;
