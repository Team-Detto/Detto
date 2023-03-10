import { atom } from 'recoil';

export const popupState = atom({
  key: 'popupState',
  default: {
    isNoteOpen: false,
    isNotificationOpen: false,
    isDropdownOpen: false,
  },
});

type ModalState = {
  isOpen: boolean;
  height: string;
  width: string;
  type: string;
  page: number;
  data: Note;
};

export const modalState = atom<ModalState>({
  key: 'modalState',
  default: {
    page: 0,
    isOpen: false,
    height: '400px',
    width: '400px',
    type: '',
    data: {
      id: '',
      senderUid: '',
      receiverUid: '',
      date: 0,
      title: '',
      content: '',
      isRead: false,
    },
  },
});

export const dayListState = atom<[]>({
  key: 'dayListState',
  default: [],
});

export const selectedProjectState = atom<any>({
  key: 'selectedProjectState',
  default: {},
});

export const userInfoState = atom<UserInfo>({
  key: 'userInfoState',
  default: {
    displayName: '',
    email: '',
    photoURL: '',
    isJunior: false,
    positions: [],
    plannerStack: [],
    designerStack: [],
    developerStack: [],
  },
});

export const mypageInfoButtonActiveState = atom<boolean>({
  key: 'mypageInfoButtonActiveState',
  default: false,
});

export const findProjectCategoryState = atom<string>({
  key: 'findProjectCategoryState',
  default: 'planner',
});

export const deletedPidState = atom<string>({
  key: 'deletedPidState',
  default: '',
});
