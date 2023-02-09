import { useState } from 'react';

const useModal = (initialValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialValue);

  const handleOpenButtonClick = (): void => {
    setIsOpen(true);
  };

  const handleCloseButtonClick = (): void => {
    setIsOpen(false);
  };

  return { isOpen, handleOpenButtonClick, handleCloseButtonClick };
};

export default useModal;
