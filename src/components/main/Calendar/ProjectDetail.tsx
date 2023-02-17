import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { selectedProjectState } from '../../../recoil/atoms';
import { getDate } from 'utils/date';

const ProjectDetail = () => {
  const selectedProject = useRecoilValue<any>(selectedProjectState);

  if (!selectedProject) return null;
  return (
    <ProjectDetailWrap>
      <div key={selectedProject}>
        <ProjectDetailContainer>
          <ProjectDetailSproutTextDiv>🌱 새싹 레벨</ProjectDetailSproutTextDiv>
          <ProjectDetailTitleAreaDiv>팀원을 구해요!</ProjectDetailTitleAreaDiv>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>프로젝트 이름</ProjectDetailTextAreaDiv>
          <div>{selectedProject.title}</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>필요 스택</ProjectDetailTextAreaDiv>
          <div>{selectedProject.developerStack + '   '}</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>팀원 레벨</ProjectDetailTextAreaDiv>
          <div>새싹</div>
        </ProjectDetailContainer>
        <ProjectDetailContainer>
          <ProjectDetailTextAreaDiv>기간</ProjectDetailTextAreaDiv>
          <div>
            {getDate(selectedProject.startDate)} ~{' '}
            {getDate(selectedProject.endDate)}
          </div>
        </ProjectDetailContainer>

        <Link to={`/project/${selectedProject.id}`}>
          <ProjectDetailButton>지원하러 가기</ProjectDetailButton>
        </Link>
      </div>
    </ProjectDetailWrap>
  );
};

const ProjectDetailWrap = styled.div`
  width: 18.75rem;
  height: 12.125rem;
  margin: 1.25rem auto 0 auto;
`;
const ProjectDetailContainer = styled.div`
  display: flex;
  direction: row;
  margin: 0.9375rem 0;
`;
const ProjectDetailTitleAreaDiv = styled.div`
  color: #464646;
  font-size: 0.875rem;
  margin-left: 0.5rem;
`;
const ProjectDetailTextAreaDiv = styled.div`
  color: #464646;
  font-size: 1rem;
  margin-right: 1rem;
`;
const ProjectDetailSproutTextDiv = styled.div`
  color: #72b819;
`;
const ProjectDetailButton = styled.button`
  background: #6b43dd;
  width: 18.75rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-top: 2.5rem;
  color: #fff;
`;
export default ProjectDetail;
