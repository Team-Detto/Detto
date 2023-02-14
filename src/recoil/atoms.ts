import { atom } from 'recoil';

export const popupState = atom({
  key: 'popupState',
  default: {
    isNoteOpen: false,
    isNotificationOpen: false,
  },
});

type ModalState = {
  isOpen: boolean;
  height: string;
  width: string;
  type: string;
  page: number;
};

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    page: 0,
    isOpen: false,
    height: '400px',
    width: '400px',
    type: '',
  },
});

export const dayListState = atom<[]>({
  key: 'dayListState',
  default: [],
});

export const detailListState = atom<[]>({
  key: 'detailListState',
  default: [],
});
