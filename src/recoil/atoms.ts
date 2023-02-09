import { atom } from 'recoil';

export const noteBoxState = atom({
  key: 'noteBoxState',
  default: false,
});

export const notificationBoxState = atom({
  key: 'notificationBoxState',
  default: false,
});
