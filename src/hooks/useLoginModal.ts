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

  return { isOpen, openModal, closeModal };
};

export default useLoginModal;
