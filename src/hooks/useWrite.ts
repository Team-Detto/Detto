import React, { useState } from 'react';
import { firebaseCreateProjectRequest } from 'apis/boardService';
import { useNavigate } from 'react-router-dom';

export interface WriteFormValueType {
  title: string;
  content: string;
  positions: {
    planner: number;
    designer: number;
    frontend: number;
    backend: number;
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
      name === 'planner' ||
      name === 'designer' ||
      name === 'frontend' ||
      name === 'backend'
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
