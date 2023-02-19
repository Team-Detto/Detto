import { useCallback, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firebaseEditProjectRequest } from 'apis/boardService';
import { useModal, useToastPopup } from 'hooks';
import Resizer from 'react-image-file-resizer';
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
  const queryClient = useQueryClient();

  const editRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [editFormValue, setEditFormValue] = useState(state);
  const [editThumbnail, setEditThumbnail] = useState(null);

  const { isOpen, handleModalStateChange } = useModal(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const { mutate: editProjectRequest } = useMutation(
    (resizedFile: any) =>
      firebaseEditProjectRequest(
        params.id as string,
        editFormValue,
        editRef.current.getInstance().getMarkdown(),
        resizedFile,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', params.id]);
        navigate(`/project/${params.id}`, {
          replace: true,
        });
      },
    },
  );

  const handleCheckValidationButtonClick = useCallback(() => {
    const { title, positions, startDate, endDate, deadline } = editFormValue;
    const markdownText = editRef.current.getInstance().getMarkdown();
    const validations = [
      {
        isValid: titleValidation(title),
        message: '타이틀 길이는 1자 이상 40자 이하로 작성해주세요.',
      },
      {
        isValid: positionValidation(positions),
        message: '포지션을 최소 1개 이상 선택해주세요.',
      },
      {
        isValid: periodValidation(startDate, endDate),
        message: '시작 날짜가 종료 날짜보다 늦을 수 없습니다.',
      },
      {
        isValid: deadlineValidation(deadline, TodayDate),
        message: '마감 날짜는 오늘 이후로 설정해주세요.',
      },
      {
        isValid: contentValidation(markdownText),
        message: '내용 길이는 1글자 이상 적어주세요.',
      },
    ];

    const invalidValidation = validations.find(({ isValid }) => !isValid);
    if (invalidValidation) {
      handleToastPopup(invalidValidation.message);
      return;
    }
    handleModalStateChange();
  }, [editFormValue]);

  const handleEditProjectButtonClick = async () => {
    if (!params.id) {
      return;
    }
    if (!editThumbnail) {
      editProjectRequest(imageRef.current.files[0]);
      return;
    }
    const resizedFile = await resizeFile(editThumbnail);
    editProjectRequest(resizedFile);
  };

  const handleAddThumbnailImage = useCallback(() => {
    imageRef.current.click();
  }, [imageRef]);

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
    setEditThumbnail,
    handleModalStateChange,
    handleFormValueChange,
    handleAddThumbnailImage,
    handleEditProjectButtonClick,
    handleCheckValidationButtonClick,
  };
};

const TIME_ZONE = 3240 * 10000;
const TodayDate = new Date(+new Date() + TIME_ZONE).toISOString().split('T')[0];

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1900,
      1200,
      'JPEG',
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob',
    );
  });

export default useEdtiBoard;
