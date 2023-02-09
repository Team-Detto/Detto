import React, { useState } from 'react';

export interface WriteFormValueType {
  title: string;
  content: string;
  plannerPosition: number;
  designerPosition: number;
  frontendPosition: number;
  backendPosition: number;
  plannerStack: string[];
  developerStack: string[];
  designerStack: string[];
  startDate: string;
  endDate: string;
  deadline: string;
}

const useWrite = () => {
  const [writeFormValue, setWriteFormValue] = useState({
    title: '',
    content: '',
    plannerPosition: 0,
    designerPosition: 0,
    frontendPosition: 0,
    backendPosition: 0,
    plannerStack: [],
    developerStack: [],
    designerStack: [],
    startDate: '',
    endDate: '',
    deadline: '',
  });

  const handleFormValueChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setWriteFormValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return { writeFormValue, handleFormValueChange };
};

export default useWrite;
