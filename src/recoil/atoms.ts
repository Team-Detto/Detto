import { atom } from 'recoil';

export const messageBoxState = atom({
  key: 'messageBoxState',
  default: false,
});

export const notificationBoxState = atom({
  key: 'notificationBoxState',
  default: false,
});
