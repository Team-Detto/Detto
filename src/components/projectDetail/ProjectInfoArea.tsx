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
      <ProjectStackContainer>
        <ProjectStackKey>프로젝트 스택</ProjectStackKey>

        <ProjectInfoStackWrap>
          <StackDiv>
            <StackTitle>기획</StackTitle>
            {plannerStack?.map((skill: string) => {
              return <StackValue key={skill}>{skill}</StackValue>;
            }) ?? '없음'}
          </StackDiv>
          <StackDiv>
            <StackTitle>개발</StackTitle>
            {developerStack?.map((skill: string) => {
              return <StackValue key={skill}>{skill}</StackValue>;
            }) ?? '없음'}
          </StackDiv>
          <StackDiv>
            <StackTitle>디자인</StackTitle>
            {designerStack?.map((skill: string) => {
              return <StackValue key={skill}>{skill}</StackValue>;
            }) ?? '없음'}
          </StackDiv>
        </ProjectInfoStackWrap>
      </ProjectStackContainer>
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
  min-height: 12.5rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const ProjectInfoObject = styled.div`
  display: flex;
  align-items: center;
  gap: 2.8125rem;
`;

const ProjectStackContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 45px;
`;

const ProjectInfoStackWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProjectInfoKey = styled.div`
  width: 130px;
`;

const ProjectInfoValue = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.5rem;
`;
const ProjectStackKey = styled.div`
  width: 130px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.625rem;
  height: 2.5rem;
`;

const StackTitle = styled.div`
  width: 65px;
`;

const StackValue = styled.div`
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
