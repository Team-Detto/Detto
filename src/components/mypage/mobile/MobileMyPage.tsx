import styled from '@emotion/styled';
import MobileUserInfo from './MobileUserInfo';
import TobTab from './TobTab';

const MobileMyPage = () => {
  return (
    <MobileMyPageContainer>
      <TobTab />
      <MobileUserInfo />
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
