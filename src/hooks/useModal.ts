import { useState, useCallback } from 'react';

const useModal = (initialValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const handleModalStateChange = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, [setIsOpen]);

  const handleModalOpenChange = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleModalCloseChange = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    handleModalStateChange,
    handleModalOpenChange,
    handleModalCloseChange,
  };
};

export default useModal;
