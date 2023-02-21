import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import UserPositions from '../UserPositions';
import { concatSkills } from 'utils/skills';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import MobileProjectList from 'components/mypage/mobile/MobileProjectList';

const MobilePublicProfilePage = ({
  userInfoData,
  activeProjectTab,
  handleProjectTabClick,
  pidList,
}: any) => {
  const {
    photoURL,
    displayName,
    email,
    positions,
    isJunior,
    plannerStack,
    designerStack,
    developerStack,
  } = userInfoData;

  const { uid } = useAuth();
  const skills = concatSkills(plannerStack, designerStack, developerStack);

  return (
    <MobileContainer>
      {/* <PublicProfileContainer> */}
      <UserInfoWrapper>
        <UserImage src={photoURL} />
        <NameAndPositionDiv>
          <UserNickName>{displayName}</UserNickName>
          <UserPositions
            positions={positions}
            isJunior={isJunior}
            version="mobile"
          />
        </NameAndPositionDiv>
        <UserEmail>{email}</UserEmail>
        <StackDiv>
          {skills.map((stack: string) => (
            <UserStacks key={stack}>{stack}</UserStacks>
          ))}
        </StackDiv>
      </UserInfoWrapper>
      <ProjectWrapper>
        <ProjectsTab
          type="public"
          category={activeProjectTab}
          onTabClick={handleProjectTabClick}
          version="mobile"
        />
        <MobileProjectList category={activeProjectTab} pidList={pidList} />
      </ProjectWrapper>
      {/* </PublicProfileContainer> */}
    </MobileContainer>
  );
};

export default MobilePublicProfilePage;

const MobileContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem 0 5rem 0;
`;

const PublicProfileContainer = styled.div``;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
`;

const UserImage = styled.img`
  width: 122px;
  height: 122px;
  border-radius: 50%;
`;

const NameAndPositionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const UserNickName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const UserEmail = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: ${COLORS.gray750};
  background: #fafafb;
  border-radius: 4px;
  padding: 4px 10px;
`;

const StackDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  justify-content: center;
  margin-top: 19px;
  gap: 4px;
`;

const UserStacks = styled.div`
  width: 74px;
  height: 26px;
  font-size: 10px;
  background: ${COLORS.gray100};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectWrapper = styled.div``;

const ProjectList = styled.div``;
