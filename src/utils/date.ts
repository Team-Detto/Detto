// 밀리초 형식의 날짜를 2023.03.02. 포맷으로 변환하는 함수
export const getDate = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};

// 밀리초 형식의 날짜를 2023.03.02. 13:52 포맷으로 변환하는 함수
export const getDateAndTime = (milliseconds: number) => {
  const date = new Date(milliseconds);
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minuites = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}.${month}.${day} ${hour}:${minuites}`;
};

//디데이 계산
export const getDays = (milliseconds: number) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  return Number(Math.floor(hours / 24));
};
