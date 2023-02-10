import styled from '@emotion/styled';

const ProjectInfoArea = ({ projectData }: any) => {
  return (
    <ProjectInfoWrapper>
      <ProjectInfoObject>
        <ProjectInfoKey>모집인원</ProjectInfoKey>
        <ProjectInfoValue>
          {`기획 ${projectData?.recruitsNumber['planner'] ?? `0`}명/ 프론트
      ${projectData?.recruitsNumber['front'] ?? `0`}명 / 백엔드
      ${projectData?.recruitsNumber['back'] ?? `0`}명/ 디자인
      ${projectData?.recruitsNumber['designer'] ?? `0`}명`}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>필요스택</ProjectInfoKey>
        <ProjectInfoValue>
          {projectData
            ? projectData?.skills?.map((skill: string) => {
                return <ProjectInfoSkillValue>{skill}</ProjectInfoSkillValue>;
              })
            : `스택명`}
        </ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>예상기간</ProjectInfoKey>
        <ProjectInfoValue>!!날짜</ProjectInfoValue>
      </ProjectInfoObject>
      <ProjectInfoObject>
        <ProjectInfoKey>근무지</ProjectInfoKey>
        <ProjectInfoValue>{projectData?.local ?? `지역명`}</ProjectInfoValue>
      </ProjectInfoObject>
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
  gap: 0.625rem;
`;
const ProjectInfoSkillValue = styled.div`
  background-color: #f2f4f6;
  padding: 0 0.75rem;
  border-radius: 2rem;
`;
