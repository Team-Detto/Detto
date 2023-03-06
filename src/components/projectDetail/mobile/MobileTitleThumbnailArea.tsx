import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import ModifyDeleteDropDown from './ModifyDeleteDropDown';
import defaultThumbnail from 'assets/images/thumbnail_small.webp';

const MobileTitleThumbnailArea = ({ pid, projectData }: any) => {
  const [popup, setPopup] = useState(false);
  const { uid } = useAuth();
  const toggleDropdownModifyMenu = () => {
    setPopup(!popup);
  };
  return (
    <>
      <TitleThumbnailAreaContainer>
        <TitleBox>
          <IsRecruitingDiv>
            {projectData?.isRecruiting ? '모집중' : '모집완료'}
          </IsRecruitingDiv>
          <TitleDiv>{projectData?.title}</TitleDiv>
        </TitleBox>

        {projectData.uid === uid && (
          <MoreIcon onClick={toggleDropdownModifyMenu} />
        )}
      </TitleThumbnailAreaContainer>
      <ProjectThumbnail
        src={projectData?.thumbnail || defaultThumbnail}
        alt={projectData?.title + ' 썸네일 이미지'}
      />
      <ModifyDeleteDropDown
        pid={pid}
        popup={popup}
        setPopup={setPopup}
        projectData={projectData}
      />
    </>
  );
};

export default MobileTitleThumbnailArea;

const TitleThumbnailAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1.25rem;
  gap: 0.75rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
`;

const IsRecruitingDiv = styled.div<{ children: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  gap: 0.625rem;
  min-width: 3.75rem;
  height: 1.75rem;
  font-size: 0.875rem;
  background: ${({ children }) =>
    children === '모집중' ? COLORS.violetB400 : COLORS.gray200};
  border-radius: 0.5rem;
  color: ${COLORS.white};
`;

const TitleDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProjectThumbnail = styled.img`
  padding: 0 1.25rem;
  width: 100%;
  height: 25vh;
  margin: 0.875rem 0 0.625rem 0;
  object-fit: cover;
`;

const MoreIcon = styled(IoMdMore)`
  font-size: 1.5rem;
  color: ${COLORS.gray750};
`;
