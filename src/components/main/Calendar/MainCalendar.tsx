import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { dayListState, selectedProjectState } from '../../../recoil/atoms';
import ProjectCalendar from './ProjectCalendar';
import ProjectDetail from './ProjectDetail';
import ProjectList from './ProjectList';

const MainCalendar = () => {
  const selectedProject = useRecoilValue<any>(selectedProjectState);
  const dayList = useRecoilValue<any>(dayListState);
  console.log('selectedProject', selectedProject);

  return (
    <MainCalendarWrap>
      <CalendarContainer>
        <ProjectCalendar />
      </CalendarContainer>
      <ProjectListContainer>
        <ProjectList />
      </ProjectListContainer>
      {dayList.length > 0 ? (
        <ProjectDetailContainer visible={!!selectedProject}>
          <ProjectDetail />
        </ProjectDetailContainer>
      ) : (
        <ProjectDetailContainer />
      )}
    </MainCalendarWrap>
  );
};
const MainCalendarWrap = styled.div`
  width: 73.25rem;
  height: 26rem;
  margin: 100px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CalendarContainer = styled.div`
  width: 22.75rem;
  height: 26rem;
  position: relative;

  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray100};
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
`;
const ProjectListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 14px 0px;
  gap: 24px;
  height: 411px;
  margin-left: 5rem;
  margin-right: 5rem;
`;
const ProjectDetailContainer = styled.div<{ visible?: boolean }>`
  width: 21.75rem;
  height: 22.4375rem;
  border-radius: 0.75rem;
  border: ${({ visible }) => visible && `1px solid ${COLORS.violetB500}`};
  box-shadow: ${({ visible }) => visible && '0px 0px 6px rgba(0, 0, 0, 0.25)'};
`;

export default MainCalendar;
