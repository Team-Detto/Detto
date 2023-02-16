import { useState, useCallback } from 'react';

const useModal = (initialValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const handleModalStateChange = useCallback(() => {
    setIsOpen((prev: boolean) => !prev);
  }, [setIsOpen]);

  const handleModalOpenChagne = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleModalCloseChagne = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    handleModalStateChange,
    handleModalOpenChagne,
    handleModalCloseChagne,
  };
};

export default useModal;
