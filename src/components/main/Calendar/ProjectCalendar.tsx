import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { getDate } from 'utils/date';
import { useSetRecoilState } from 'recoil';
import { dayListState } from '../../../recoil/atoms';
import COLORS from '../../../assets/styles/colors';
const ProjectCalendar = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const [value, onChange] = useState(new Date());
  const setDayList = useSetRecoilState(dayListState);
  const SelectDate = getDate(value.getTime());
  const getDayList = (createAt: any, deadline: any) => {
    const dayList = [];
    const start = new Date(getDate(createAt));
    const end = new Date(getDate(deadline));
    while (start <= end) {
      dayList.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dayList;
  };
  useEffect(() => {
    firebaseGetProjectDataRequest(setProjectData);
  }, []);

  useEffect(() => {
    setDayList(
      projectData.filter((el: any) =>
        getDayList(el.createdAt, el.deadline)
          .map((el) => getDate(el.getTime()))
          .includes(SelectDate),
      ),
    );
  }, [projectData, value]);
  return (
    <ProjectCalendarWrap
      onChange={onChange}
      value={value}
      calendarType={'US'}
      formatDay={(locale, date) => `${date.getDate()}`}
    />
  );
};
const ProjectCalendarWrap = styled(Calendar)`
  button {
    width: 2.75rem;
    height: 2rem;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 2rem;
  }

  .react-calendar {
    width: 22.75rem;
    height: 26rem;
  }
  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__navigation {
    margin: 30px 30px auto 30px;
    width: 18.125rem;
    height: 2rem;
    display: flex;
    align-items: center;
  }
  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    width: 1.5rem;
    height: 1.5rem;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    margin: 1.875rem;
    border: none;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    line-height: 2rem;
  }
  .react-calendar__month-view__days {
    text-align: center;
    width: 19rem;
    height: 15.125rem;
    margin: 0 auto;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: ${COLORS.gray500} !important;
    cursor: pointer;
  }
  abbr {
    text-decoration: none;
  }
  [aria-label='일요일'] {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1rem;
    line-height: 2rem;
    color: ${COLORS.gray750};
  }
  [aria-label='토요일'] {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 1rem;
    line-height: 2rem;
    color: ${COLORS.gray750};
  }
  .react-calendar__tile--active {
    background: ${COLORS.violetB400};
    color: ${COLORS.white} !important;
    border-radius: 3px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: ${COLORS.violetA100};
  }
`;
export default ProjectCalendar;
