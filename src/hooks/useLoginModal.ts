import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms';
import LoginModal from 'components/login/LoginModal';

const useLoginModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const { isOpen } = modal;

  const openModal = (type: string, page: number): void => {
    setModal({
      ...modal,
      isOpen: true,
      type,
      page,
    });
  };

  const closeModal = (): void => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  const updateModalContent = (newContent: React.ReactNode): void => {
    setModal({
      ...modal,
    });
  };

  const updateModalSize = (newHeight: string, newWidth: string): void => {
    setModal({
      ...modal,
      height: newHeight,
      width: newWidth,
    });
  };

  return { isOpen, openModal, closeModal, updateModalContent, updateModalSize };
};

export default useLoginModal;
