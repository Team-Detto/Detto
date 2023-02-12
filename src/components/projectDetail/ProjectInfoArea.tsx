import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { getDate } from 'utils/date';

const ProjectInfoArea = ({ projectData }: any) => {
  const {
    positions,
    developerStack,
    designerStack,
    plannerStack,
    startDate,
    endDate,
  } = projectData;

  return (
    <ProjectInfoWrapper>
      <ProjectInfoObject>
        <ProjectInfoKey>모집인원</ProjectInfoKey>
        <ProjectInfoValue>
          {`기획 ${positions['planner'] ?? `0`}명/ 프론트
      ${positions['frontend'] ?? `0`}명 / 백엔드
      ${positions['backend'] ?? `0`}명/ 디자인
      ${positions['designer'] ?? `0`}명`}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>필요스택</ProjectInfoKey>
        <ProjectInfoValue>
          <StackDiv>
            기획
            {plannerStack?.map((skill: string) => {
              return <ProjectInfoSkillValue>{skill}</ProjectInfoSkillValue>;
            }) ?? '없음'}
          </StackDiv>
          <StackDiv>
            개발
            {developerStack?.map((skill: string) => {
              return <ProjectInfoSkillValue>{skill}</ProjectInfoSkillValue>;
            }) ?? '없음'}
          </StackDiv>
          <StackDiv>
            디자인
            {designerStack?.map((skill: string) => {
              return <ProjectInfoSkillValue>{skill}</ProjectInfoSkillValue>;
            }) ?? '없음'}
          </StackDiv>
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>예상기간</ProjectInfoKey>
        <ProjectInfoValue>
          {getDate(startDate)} - {getDate(endDate)}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject></ProjectInfoObject>
    </ProjectInfoWrapper>
  );
};

export default ProjectInfoArea;

const ProjectInfoWrapper = styled.div`
  width: 63.625rem;
  height: 12.5rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8125rem;
`;

const ProjectInfoKey = styled.div`
  width: 5.5rem;
`;

const ProjectInfoValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 42px;
  height: 2.5rem;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.625rem;
  height: 2.5rem;
  /* white-space: nowrap;
  overflow: hidden; //넘친다면 어떻게 처리할지? */
`;

const ProjectInfoSkillValue = styled.div`
  background-color: ${COLORS.gray100};
  height: 32px;
  padding: 0 0.75rem;
  border-radius: 2rem;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
