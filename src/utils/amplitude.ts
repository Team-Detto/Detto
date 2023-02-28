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

// 현재 페이지의 path를 반환하는 함수
export const getCurrentPathName = () => {
  const path = window.location.pathname;
  if (path === '/') return 'main';
  if (path === '/project/write') return 'project_write';
  if (path.startsWith('/project/write')) return 'project_edit';
  if (path.startsWith('/project/')) return 'project_detail';
  return location.pathname.split('/')[1];
};

// to: 'none'인 이벤트를 로깅하는 함수
export const amplitudeToNoneButtonClick = (name: string) => {
  logEvent('Button Click', {
    from: getCurrentPathName(),
    to: 'none',
    name,
  });
};

// to: 가 필요한 이벤트를 로깅하는 함수
export const amplitudeNeedToButtonClick = (to: string, name: string) => {
  logEvent('Button Click', {
    from: getCurrentPathName(),
    to,
    name,
  });
};
