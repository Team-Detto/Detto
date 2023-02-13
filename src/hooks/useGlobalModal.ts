import { useRecoilState } from 'recoil';
import { modalState } from '../recoil/atoms';

const useGlobalModal = () => {
  const [modal, setModal] = useRecoilState(modalState);

  const openModal = (type: string, page: number) => {
    setModal({
      ...modal,
      isOpen: true,
      type,
      page,
    });
  };

  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  const updateModalSize = (width: string, height: string) => {
    setModal({
      ...modal,
      width,
      height,
    });
  };

  return { modal, openModal, closeModal, updateModalSize };
};

export default useGlobalModal;
