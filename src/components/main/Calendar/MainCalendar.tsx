import styled from '@emotion/styled';
import ProjectCalendar from './ProjectCalendar';
import ProjectDetail from './ProjectDetail';
import ProjectList from './ProjectList';

const MainCalendar = () => {
  return (
    <MainCalendarWrap>
      <CalendarContainer>
        <ProjectCalendar />
      </CalendarContainer>
      <ProjectListContainer>
        <ProjectList />
      </ProjectListContainer>
      <ProjectDetailContainer>
        <ProjectDetail />
      </ProjectDetailContainer>
    </MainCalendarWrap>
  );
};
const MainCalendarWrap = styled.div`
  width: 73.25rem;
  height: 26rem;
  margin-top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CalendarContainer = styled.div`
  width: 22.75rem;
  height: 26rem;
  /* background-color: red; */
`;
const ProjectListContainer = styled.div`
  width: 18.75rem;
  height: 26rem;
  margin-left: 5rem;
  margin-right: 5rem;
  display: flex;
  align-items: center;
`;
const ProjectDetailContainer = styled.div`
  width: 21.75rem;
  height: 22.4375rem;
  border: 1px solid #5d50f0;
  border-radius: 0.75rem;
`;

export default MainCalendar;

// 캘린더 오늘 날짜에 클릭 이벤트
// 수직 슬라이더 한칸씩 이동
