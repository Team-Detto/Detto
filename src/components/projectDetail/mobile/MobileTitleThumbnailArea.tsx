import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const MobileTitleThumbnailArea = ({ projectData }: any) => {
  return (
    <>
      <TitleThumbnailAreaContainer>
        <IsRecruitingDiv>
          {projectData?.isRecruiting ? '모집중' : '모집완료'}
          {/* 스타일 바꾸기 */}
        </IsRecruitingDiv>
        <TitleDiv>{projectData?.title}</TitleDiv>
        {/* 수정, 삭제 추가 */}
      </TitleThumbnailAreaContainer>
      <ProjectThumbnail src={projectData?.thumbnail} />
    </>
  );
};

export default MobileTitleThumbnailArea;

const TitleThumbnailAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  height: 28px;
  padding: 0 20px;
  gap: 12px;
`;

const IsRecruitingDiv = styled.div<{ children: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
  width: 60px;
  height: 28px;
  font-size: 14px;
  background: ${({ children }) =>
    children === '모집중' ? COLORS.violetB400 : COLORS.gray200};
  border-radius: 8px;
  color: ${COLORS.white};
`;

const TitleDiv = styled.div``;

const ProjectThumbnail = styled.img`
  min-width: 200px;
  width: 90%;
  height: 174px;
  margin: 14px 20px;
  object-fit: cover;
`;
