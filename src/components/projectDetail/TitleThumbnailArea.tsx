import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const TitleThumbnailArea = (props: any) => {
  const { projectData } = props;
  return (
    <>
      <TitleToModifyButtonWrap>
        <ProjectTitleWrapper>
          <RecruitmentDiv>모집중</RecruitmentDiv>
          <ProjectTitle>{projectData?.title ?? `제목`}</ProjectTitle>
        </ProjectTitleWrapper>
        {/* currentUser가 글쓴이인지 비교 true이면 수정하기 버튼 보여주기 */}
        <ModifyButton>수정하기</ModifyButton>
      </TitleToModifyButtonWrap>
      <ProjectThumbnail src={projectData?.thumbnailURL} />
    </>
  );
};

export default TitleThumbnailArea;

const TitleToModifyButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16.125rem;
`;

const ProjectTitleWrapper = styled.div`
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

const ModifyButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 10px;
  background: ${COLORS.gray100};
  color: ${COLORS.gray400};
  border-radius: 4px;
  width: 91px;
  height: 48px;
`;

const ProjectThumbnail = styled.img`
  width: 73.75rem;
  height: 36.5rem;
  margin-top: 1rem;
  background-color: #dadada; //영역 표시용 임시 색상
`;
