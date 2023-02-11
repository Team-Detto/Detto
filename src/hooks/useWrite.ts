import { useState, useRef, useCallback, ChangeEvent } from 'react';
import { useModal } from 'hooks';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import { useNavigate } from 'react-router-dom';
import { WriteType } from 'types/write/writeType';

const useWrite = () => {
  const navigate = useNavigate();

  const editRef = useRef<any>(null);

  const [writeFormValue, setWriteFormValue] = useState<WriteType.WriteFormType>(
    initialWriteFormValue,
  );

  const { isOpen, handleModalStateChange } = useModal(false);

  const handleCreateProjectButtonClick = async () => {
    const markdownText = editRef.current.getInstance().getMarkdown();
    await firebaseCreateProjectRequest(writeFormValue, markdownText);
    navigate('/', {
      replace: true,
    });
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
    writeFormValue,
    handleModalStateChange,
    handleFormValueChange,
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
