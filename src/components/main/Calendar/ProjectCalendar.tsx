import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import React from 'react';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { getDate } from 'utils/date';
import { useSetRecoilState } from 'recoil';
import { dayListState } from '../../../recoil/atoms';

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
      formatDay={(locale, date) => `${date.getDate()}`}
    />
  );
};
const ProjectCalendarWrap = styled(Calendar)`
  button {
    width: 44px;
    height: 32px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
  }

  .react-calendar {
    width: 364px;
    height: 416px;
  }
  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }
  .react-calendar__navigation {
    margin: 30px 30px auto 30px;
    width: 290px;
    height: 32px;
    display: flex;
    align-items: center;
  }
  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    width: 24px;
    height: 24px;
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    margin: 30px;
    border: none;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
  }
  .react-calendar__month-view__days {
    text-align: center;
    width: 304px;
    height: 242px;
    margin: 0 auto;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #a5afb9 !important;
    cursor: pointer;
  }
  abbr {
    text-decoration: none;
  }
  [aria-label='일요일'] {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    color: #6b7684;
  }
  [aria-label='토요일'] {
    font-family: 'Noto Sans KR';
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    color: #6b7684;
  }
  .react-calendar__tile--active {
    background: #6f64f2;
    color: #fff !important;
    border-radius: 3px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #b3a2e3;
  }
`;
export default ProjectCalendar;
