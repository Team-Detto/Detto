import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import React from 'react';
import { log } from 'console';
// 달력에 숫자만 보이게 만들기 위한 moment 라이브러리
import moment from 'moment';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { getDate } from 'utils/date';
import { useSetRecoilState } from 'recoil';
import { dayListState } from '../../../recoil/atoms';

const ProjectCalendar = () => {
  const [projectData, setProjectData] = useState<any>([]);
  const [value, onChange] = useState(new Date());
  const setDayList = useSetRecoilState(dayListState);

  // 날짜가 바뀔때마다 데이터를 가져옴
  useEffect(() => {
    firebaseGetProjectDataRequest(setProjectData);
  }, [setProjectData]);

  //  선택 한 날짜 => moment(value).format('YYYY년 MM월 DD일')
  const SelectDate = moment(value).format('YYYY.MM.DD');

  // 해당 날의 생선된 프로젝트만 필터링
  // const filterData = setDayList(
  //   projectData.filter((el: any) => getDate(el.createdAt) === SelectDate),
  // );

  //  시작 부터 마감일까지 날짜를 배열로 만들어서 리턴
  const getDayList = (startDate: any, endDate: any) => {
    const dayList = [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    while (start <= end) {
      dayList.push(new Date(start));
      start.setDate(start.getDate() + 1);
    }
    return dayList;
  };
  //해당 날의 진행중인 프로젝트 필터링
  const filterData = setDayList(
    projectData.filter((el: any) =>
      getDayList(el.startDate, el.endDate)
        .map((el) => getDate(el))
        .includes(SelectDate),
    ),
  );

  return (
    <>
      <ProjectCalendarWrap
        onChange={onChange}
        value={value}
        // 달력에 숫자만 보이게 만들기 위한 moment 라이브러리
        formatDay={(locale, date) => moment(date).format('DD')}
      />
    </>
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
