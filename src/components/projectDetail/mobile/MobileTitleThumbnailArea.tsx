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
      <ProjectThumbnail src={projectData?.thumbnail} />
      <ModifyDeleteDropDown pid={pid} popup={popup} setPopup={setPopup} />
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
  height: 28px;
  padding: 0 20px;
  gap: 12px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 28px;
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

const MoreIcon = styled(IoMdMore)`
  font-size: 1.5rem;
  color: ${COLORS.gray750};
`;
