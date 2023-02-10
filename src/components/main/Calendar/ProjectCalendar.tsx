import { useState } from 'react';
import Calendar from 'react-calendar';
import styled from '@emotion/styled';
import React from 'react';

const ProjectCalendar = () => {
  const [value, onChange] = useState(new Date());

  return <ProjectCalendarWrap onChange={onChange} value={value} />;
};
const ProjectCalendarWrap = styled(Calendar)`
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
  }
  .react-calendar__month-view__days {
    text-align: center;
    /* background: purple; */
    width: 304px;
    height: 242px;
    margin: 0 auto;
  }
`;

export default ProjectCalendar;
