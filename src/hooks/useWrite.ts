import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'hooks';
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

  const { isOpen, handleModalStateChange } = useModal(false);

  const handleCreateProjectButtonClick = async () => {
    const markdownText = editRef.current.getInstance().getMarkdown();

    const isTitleValid = titleValidation(writeFormValue.title);
    const isContentValid = contentValidation(markdownText);
    const isPositionValid = positionValidation(writeFormValue.positions);
    const isPeriodValid = periodValidation(
      writeFormValue.startDate,
      writeFormValue.endDate,
    );
    const isDeadlineValid = deadlineValidation(writeFormValue.deadline);

    if (!isTitleValid || !isContentValid) {
      alert('제목과 내용을 입력해주세요.');
      return;
    }
    if (!isPositionValid) {
      alert('포지션을 선택해주세요.');
      return;
    }
    if (!isPeriodValid) {
      alert('기간을 선택해주세요.');
      return;
    }
    if (!isDeadlineValid) {
      alert('마감일을 선택해주세요.');
      return;
    }

    await firebaseCreateProjectRequest(
      writeFormValue,
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
    writeFormValue,
    setWriteFormValue,
    handleModalStateChange,
    handleFormValueChange,
    handleAddThumbnailImage: handleAddThumbnailImage,
    handleCreateProjectButtonClick,
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

export default useWrite;
