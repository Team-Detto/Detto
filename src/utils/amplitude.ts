import { init, track, setUserId, reset } from '@amplitude/analytics-browser';

const API_KEY = process.env.REACT_APP_AMPLITUDE_API_KEY!;

export const initAmplitude = () => {
  init(API_KEY);
};

export const logEvent = (eventName: string, eventProperties: any) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = (userId: string) => {
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};

export const getCurrentPathName = () => {
  const pathName = window.location.pathname.split('/')[1];
  return pathName === '' ? 'main' : pathName;
};
