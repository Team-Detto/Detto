import { useState, useCallback } from 'react';

const useModal = (initialValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const handleModalStateChange = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, [setIsOpen]);

  return {
    isOpen,
    handleModalStateChange,
  };
};

export default useModal;
