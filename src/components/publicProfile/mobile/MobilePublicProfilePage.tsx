import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import UserPositions from '../UserPositions';
import { concatSkills } from 'utils/skills';
import ProjectsTab from 'components/common/myProjectList/ProjectsTab';
import MobileProjectList from 'components/mypage/mobile/MobileProjectList';
import PublicProfileImage from './PublicProfileImage';

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

  const skills = concatSkills(plannerStack, designerStack, developerStack);

  return (
    <MobileContainer>
      <UserInfoWrapper>
        <PublicProfileImage userInfoData={userInfoData} photoURL={photoURL} />
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
    </MobileContainer>
  );
};

export default MobilePublicProfilePage;

const MobileContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${COLORS.gray50};
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5625rem;
  margin-top: 3rem;
  padding-bottom: 2rem;
  background-color: ${COLORS.white};
`;

const NameAndPositionDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const UserNickName = styled.div`
  font-weight: 500;
  font-size: 1rem;
`;

const UserEmail = styled.div`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${COLORS.gray750};
  background: #fafafb;
  border-radius: 0.25rem;
  padding: 0.25rem 0.625rem;
`;

const StackDiv = styled.div`
  width: 18rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1.1875rem;
  gap: 0.5rem;
`;

const UserStacks = styled.div`
  width: 4.625rem;
  height: 1.625rem;
  font-size: 0.625rem;
  background: ${COLORS.gray100};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProjectWrapper = styled.div`
  background-color: ${COLORS.white};
`;
