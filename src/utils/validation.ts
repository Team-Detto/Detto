export const titleValidation = (title: string) => {
  if (title.length === 0) return false;
  return title.length <= 40 ? true : false;
};

export const contentValidation = (content: string) => {
  if (content.length === 0) return false;
  return content.length <= 2000 ? true : false;
};

export const positionValidation = (position: object) => {
  if (Object.values(position).every((value: number) => value <= 0)) {
    return false;
  }
  return true;
};

export const periodValidation = (startDate: string, endDate: string) => {
  if (startDate === '' || endDate === '') return false;
  if (startDate > endDate) return false;
  return true;
};

export const deadlineValidation = (deadline: string) => {
  if (deadline === '') return false;
  return true;
};

export const nicknameValidation = (nickname: string) => {
  if (nickname === '') return false;
  if (nickname.length >= 20) return false;
  return true;
};

export const contactValidation = (contact: string) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (contact === '') return false;
  if (!contact.match(emailRegex)) return false;
  return true;
};
