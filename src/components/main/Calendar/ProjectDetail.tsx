import styled from '@emotion/styled';

const ProjectDetail = () => {
  return (
    <ProjectDetailWrap>
      <ProjectDetailContainer>
        <ProjectDetailSproutTextDiv>🌱 새싹 레벨</ProjectDetailSproutTextDiv>
        <ProjectDetailTitleAreaDiv>팀원을 구해요!</ProjectDetailTitleAreaDiv>
      </ProjectDetailContainer>
      <ProjectDetailContainer>
        <ProjectDetailTextAreaDiv>프로젝트 이름</ProjectDetailTextAreaDiv>
        <div>프로젝트 이름입니다</div>
      </ProjectDetailContainer>
      <ProjectDetailContainer>
        <ProjectDetailTextAreaDiv>필요 스택</ProjectDetailTextAreaDiv>
        <div>Node.js</div>
      </ProjectDetailContainer>
      <ProjectDetailContainer>
        <ProjectDetailTextAreaDiv>팀원 레벨</ProjectDetailTextAreaDiv>
        <div>새싹</div>
      </ProjectDetailContainer>
      <ProjectDetailContainer>
        <ProjectDetailTextAreaDiv>기간</ProjectDetailTextAreaDiv>
        <div>YYYY.MM.DD - YYYY.MM.DD</div>
      </ProjectDetailContainer>
      <ProjectDetailContainer>
        <ProjectDetailTextAreaDiv>근무지</ProjectDetailTextAreaDiv>
        <div>대한 민국</div>
      </ProjectDetailContainer>

      <ProjectDetailButton>지원하러 가기</ProjectDetailButton>
    </ProjectDetailWrap>
  );
};
const ProjectDetailWrap = styled.div`
  width: 18.75rem;
  height: 12.125rem;
  margin: 20px auto 0 auto;
`;
const ProjectDetailContainer = styled.div`
  display: flex;
  direction: row;
  margin: 15px 0;
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
  margin-top: 40px;
  color: #fff;
`;
export default ProjectDetail;
