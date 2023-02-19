import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useModal, useToastPopup } from 'hooks';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import Resizer from 'react-image-file-resizer';
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
    const { title, positions, startDate, endDate, deadline } = writeFormValue;
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
  }, [writeFormValue]);

  const handleCreateProjectButtonClick = async () => {
    const { thumbnail } = writeFormValue;
    const markdownText = editRef.current.getInstance().getMarkdown();

    if (!thumbnail) {
      const docId = await firebaseCreateProjectRequest(
        writeFormValue,
        markdownText,
        null,
        uid,
      );
      navigate(`/project/${docId}`, {
        replace: true,
      });
      return;
    }

    const resizedImage = await resizeFile(thumbnail);

    const docId = await firebaseCreateProjectRequest(
      writeFormValue,
      markdownText,
      resizedImage,
      uid,
    );
    navigate(`/project/${docId}`, {
      replace: true,
    });
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
  thumbnail: null,
  plannerStack: [],
  developerStack: [],
  designerStack: [],
  startDate: '',
  endDate: '',
  deadline: '',
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

export default useWrite;
