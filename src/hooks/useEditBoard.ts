import { useCallback, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { firebaseEditProjectRequest } from 'apis/boardService';
import { EditType } from './../types/write/writeType';
import useModal from './useModal';

const useEdtiBoard = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const editRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const [editFormValue, setEditFormValue] = useState(state);

  const { isOpen, handleModalStateChange } = useModal(false);

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

  const handleAddSumnailImage = () => {
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
    editFormValue,
    handleModalStateChange,
    handleFormValueChange,
    handleAddSumnailImage,
    handleEditProjectButtonClick,
  };
};

export default useEdtiBoard;
