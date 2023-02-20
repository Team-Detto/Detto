import styled from '@emotion/styled';
import TobTab from './TobTab';

const MobileMyPage = () => {
  return (
    <MobileMyPageContainer>
      <TobTab />
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
