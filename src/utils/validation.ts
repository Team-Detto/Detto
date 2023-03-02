export const titleValidation = (title: string) => {
  if (title.length < 5) return false;
  if (title.length > 40) return false;
  return true;
};

export const contentValidation = (content: string) => {
  if (content.length < 10) return false;
  return true;
};

export const positionValidation = (position: object) => {
  if (Object.values(position).every((value: number) => value <= 0)) {
    return false;
  }
  if (Object.values(position).some((value: number) => value < 0)) {
    return false;
  }
  return true;
};

export const stackValidation = (
  plannerStack: string[],
  designerStack: string[],
  developerStack: string[],
  positions: {
    planner: number;
    designer: number;
    frontend: number;
    backend: number;
  },
) => {
  if (positions.planner > 0 && plannerStack.length === 0) return false;
  if (positions.designer > 0 && designerStack.length === 0) return false;
  if (positions.frontend > 0 && developerStack.length === 0) return false;
  if (positions.backend > 0 && developerStack.length === 0) return false;
  return true;
};

export const periodValidation = (
  startDate: string | number,
  endDate: string | number,
) => {
  if (startDate === '' || endDate === '') return false;
  if (startDate > endDate) return false;
  return true;
};

export const deadlineValidation = (
  deadline: string | number,
  TodayDate: string,
) => {
  if (deadline === '') return false;
  if (deadline < TodayDate) return false;
  return true;
};

export const nicknameValidation = (nickname: string) => {
  if (nickname.length < 2) return false;
  if (nickname.length > 7) return false;
  return true;
};

export const contactValidation = (contact: string) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (contact === '') return false;
  if (!contact.match(emailRegex)) return false;
  return true;
};
