import styled from '@emotion/styled';
import MobileUserInfo from './MobileUserInfo';
import TobTab from './TobTab';

const MobileMyPage = ({ user }: MypageInfoProps) => {
  return (
    <MobileMyPageContainer>
      <TobTab />
      <MobileUserInfo user={user} />
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
