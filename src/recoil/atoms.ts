import { atom } from 'recoil';

export const popupState = atom({
  key: 'popupState',
  default: {
    isNoteOpen: false,
    isNotificationOpen: false,
  },
});
