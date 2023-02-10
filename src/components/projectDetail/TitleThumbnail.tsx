import styled from '@emotion/styled';

const TitleThumbnail = (props: any) => {
  const { projectData } = props;
  return (
    <>
      <ProjectTitleWrapper>
        <RecruitmentDiv>모집중</RecruitmentDiv>
        <ProjectTitle>{projectData?.title ?? `제목`}</ProjectTitle>
      </ProjectTitleWrapper>
      <ProjectThumbnail src={projectData?.thumbnailURL} />
    </>
  );
};

export default TitleThumbnail;

const ProjectTitleWrapper = styled.div`
  margin-top: 16.125rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const RecruitmentDiv = styled.div`
  background-color: #6f64f2;
  color: #fff;
  padding: 0.625rem 1.875rem;
  border-radius: 2.5rem;
  font-size: 1.5rem;
`;

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;

const ProjectThumbnail = styled.img`
  width: 73.75rem;
  height: 36.5rem;
  margin-top: 1rem;
  background-color: #dadada;
`;
