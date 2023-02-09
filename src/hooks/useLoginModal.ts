import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms';

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

  const updateModalSize = (width: string, height: string): void => {
    setModal({
      ...modal,
      width,
      height,
    });
  };

  return { isOpen, modal, openModal, closeModal, updateModalSize };
};

export default useLoginModal;
