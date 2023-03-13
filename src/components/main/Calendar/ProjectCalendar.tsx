import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { getDate } from 'utils/date';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dayListState } from '../../../recoil/atoms';
import COLORS from '../../../assets/styles/colors';
const ProjectCalendar = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const [value, onChange] = useState(new Date());
  const [dayList, setDayList] = useRecoilState(dayListState);
  const SelectDate = getDate(value.getTime());
  const getDayList = (createAt: number, deadline: number) => {
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

  const isAllDayProject = (date: any) => {
    const day = getDate(date.getTime());
    return projectData.some((el: any) =>
      getDayList(el.createdAt, el.deadline)
        .map((el) => getDate(el.getTime()))
        .includes(day),
    );
  };

  const tileContent = ({ date, view }: any): any => {
    if (view === 'month' && isAllDayProject(date)) {
      return (
        <span
          style={{
            fontSize: '15px',
            position: 'absolute',
            marginBottom: '15px',
            color: COLORS.violetB50,
          }}
        >
          •
        </span>
      );
    }
  };

  return (
    <ProjectCalendarWrap
      onChange={onChange}
      value={value}
      calendarType={'US'}
      formatDay={(locale, date) => `${date.getDate()}`}
      tileContent={tileContent}
    />
  );
};
const Dots = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${COLORS.violetA100};
`;
const ProjectCalendarWrap = styled(Calendar)`
  button {
    width: 2.75rem;
    height: 2rem;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
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
    margin: -8px auto 0 auto;
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
