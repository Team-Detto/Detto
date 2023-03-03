export const preventScroll = () => {
  document.body.style.overflowY = 'hidden';
};

export const allowScroll = () => {
  document.body.style.overflowY = 'overlay';
};
