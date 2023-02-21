import { useState } from 'react';
import styled from '@emotion/styled';
import MobileTopTab from './MobileTopTab';
import MobileUserInfo from './MobileUserInfo';
import { ProjectListWrapper } from 'pages/MyPage';

const MobileMyPage = ({ user }: MypageInfoProps) => {
  const [activeTab, setActiveTab] = useState('개인정보');

  return (
    <MobileMyPageContainer>
      <MobileTopTab activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === '개인정보' && <MobileUserInfo user={user} />}
      {activeTab === '프로젝트' && <ProjectListWrapper></ProjectListWrapper>}
    </MobileMyPageContainer>
  );
};

export default MobileMyPage;

const MobileMyPageContainer = styled.div`
  width: 100%;
`;
