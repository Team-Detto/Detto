// 밀리초 형식의 날짜를 2023.03.02. 13:52 포맷으로 변환하는 함수
export const getDate = (milliseconds: number | string | Date) => {
  const date = new Date(milliseconds);
  const year = `${date.getFullYear()}`.padStart(4, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  // const hour = `${date.getHours()}`.padStart(2, '0');
  // const minuites = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}.${month}.${day}`;
};
