import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useModal, useToastPopup } from 'hooks';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import { WriteType } from 'types/write/writeType';
import {
  titleValidation,
  contentValidation,
  positionValidation,
  periodValidation,
  deadlineValidation,
} from './../utils/validation';

const useWrite = () => {
  const navigate = useNavigate();

  const editRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [writeFormValue, setWriteFormValue] = useState<WriteType.WriteFormType>(
    initialWriteFormValue,
  );

  const { uid } = useAuth();
  const { isOpen, handleModalStateChange } = useModal(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const handleCheckValidationButtonClick = useCallback(() => {
    const markdownText = editRef.current.getInstance().getMarkdown();

    const isTitleValid = titleValidation(writeFormValue.title);
    const isContentValid = contentValidation(markdownText);
    const isPositionValid = positionValidation(writeFormValue.positions);
    const isPeriodValid = periodValidation(
      writeFormValue.startDate,
      writeFormValue.endDate,
    );
    const isDeadlineValid = deadlineValidation(
      writeFormValue.deadline,
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
  }, [writeFormValue]);

  const handleCreateProjectButtonClick = async () => {
    const markdownText = editRef.current.getInstance().getMarkdown();

    await firebaseCreateProjectRequest(
      writeFormValue,
      markdownText,
      imageRef.current.files[0],
      uid,
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
        setWriteFormValue((prev: WriteType.WriteFormType) => {
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
      setWriteFormValue((prev: WriteType.WriteFormType) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setWriteFormValue],
  );

  return {
    isOpen,
    editRef,
    imageRef,
    showToast,
    ToastMessage,
    writeFormValue,
    setWriteFormValue,
    handleModalStateChange,
    handleFormValueChange,
    handleAddThumbnailImage,
    handleCreateProjectButtonClick,
    handleCheckValidationButtonClick,
  };
};

const initialWriteFormValue = {
  title: '',
  positions: {
    planner: 0,
    designer: 0,
    frontend: 0,
    backend: 0,
  },
  plannerStack: [],
  developerStack: [],
  designerStack: [],
  startDate: '',
  endDate: '',
  deadline: '',
};

const TIME_ZONE = 3240 * 10000;
const TodayDate = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];

export default useWrite;
