import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import ModifyDeleteDropDown from './ModifyDeleteDropDown';

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
        src={projectData?.thumbnail}
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
  height: 1.75rem;
  padding: 0 1.25rem;
  gap: 0.75rem;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 1.75rem;
  gap: 0.75rem;
`;

const IsRecruitingDiv = styled.div<{ children: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0rem;
  gap: 0.625rem;
  width: 3.75rem;
  height: 1.75rem;
  font-size: 0.875rem;
  background: ${({ children }) =>
    children === '모집중' ? COLORS.violetB400 : COLORS.gray200};
  border-radius: 0.5rem;
  color: ${COLORS.white};
`;

const TitleDiv = styled.div``;

const ProjectThumbnail = styled.img`
  min-width: 12.5rem;
  width: 90%;
  height: 10.875rem;
  margin: 0.875rem 1.25rem;
  object-fit: cover;
`;

const MoreIcon = styled(IoMdMore)`
  font-size: 1.5rem;
  color: ${COLORS.gray750};
`;
