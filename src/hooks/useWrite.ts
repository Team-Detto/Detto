import React, { useState } from 'react';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import { useNavigate } from 'react-router-dom';

export interface WriteFormValueType {
  title: string;
  content: string;
  positions: {
    plannerPosition: number;
    designerPosition: number;
    frontendPosition: number;
    backendPosition: number;
  };
  plannerStack: string[];
  developerStack: string[];
  designerStack: string[];
  startDate: string;
  endDate: string;
  deadline: string;
}

const useWrite = () => {
  const navigate = useNavigate();
  const [writeFormValue, setWriteFormValue] = useState({
    title: '',
    content: '',
    positions: {
      plannerPosition: 0,
      designerPosition: 0,
      frontendPosition: 0,
      backendPosition: 0,
    },
    plannerStack: [],
    developerStack: [],
    designerStack: [],
    startDate: '',
    endDate: '',
    deadline: '',
  });

  const handleCreateProjectButtonClick = () => {
    firebaseCreateProjectRequest(writeFormValue);
    navigate('/');
  };

  const handleFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (
      name === 'plannerPosition' ||
      name === 'designerPosition' ||
      name === 'frontendPosition' ||
      name === 'backendPosition'
    ) {
      setWriteFormValue((prev) => {
        return {
          ...prev,
          positions: {
            ...prev.positions,
            [name]: Number(value),
          },
        };
      });
      return;
    } else {
      setWriteFormValue((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  };

  return {
    writeFormValue,
    handleFormValueChange,
    handleCreateProjectButtonClick,
  };
};

export default useWrite;
