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

  const openModalWithData = (type: string, data: Note) => {
    setModal({
      ...modal,
      isOpen: true,
      type,
      page: 0,
      data,
    });
  };

  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  return { modal, openModal, openModalWithData, closeModal };
};

export default useGlobalModal;
