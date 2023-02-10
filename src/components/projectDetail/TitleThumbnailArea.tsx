import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const TitleThumbnailArea = (props: any) => {
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

export default TitleThumbnailArea;

const ProjectTitleWrapper = styled.div`
  margin-top: 16.125rem;
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

const RecruitmentDiv = styled.div`
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
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
  background-color: #dadada; //영역 표시용 임시 색상
`;
