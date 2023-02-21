import styled from '@emotion/styled';
import { useState } from 'react';
import MobileUserInfo from './MobileUserInfo';
import TobTab from './TobTab';

const MobileMyPage = ({ user }: MypageInfoProps) => {
  const [activeTab, setActiveTab] = useState('개인정보');

  return (
    <MobileMyPageContainer>
      <TobTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === '개인정보' && <MobileUserInfo user={user} />}
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
