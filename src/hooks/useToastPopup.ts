import { useEffect, useState, useCallback } from 'react';

const useToastPopup = () => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [ToastMessage, setToastMessage] = useState<string>('');

  const handleToastPopup = useCallback(
    (message: string) => {
      setShowToast(true);
      setToastMessage(message);
    },
    [showToast],
  );

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return {
    showToast,
    ToastMessage,
    handleToastPopup,
  };
};

export default useToastPopup;
