import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import UserStacks from 'components/publicProfile/UserStacks';
import InviteModal from '../InviteModals/InviteModal';
import { useModal } from 'hooks';
import { useState } from 'react';

const MobileApplicantCard = ({ key, pid, applicant }: any) => {
  const { isOpen, handleModalStateChange } = useModal(false);
  const [applicantKey, setApplicantKey] = useState('');
  return (
    <ApplicantCard>
      <ProfileImg src={applicant.profileURL} />
      <UserInfoDiv>
        <Position>{applicant.position}</Position>
        <DisplayName>{applicant.displayName}</DisplayName>
        <Stacks>
          <UserStacks stacks={applicant.skills} version="mobile"></UserStacks>
        </Stacks>
      </UserInfoDiv>
      <InviteButton
        onClick={() => {
          handleModalStateChange();
          setApplicantKey(key);
        }}
      >
        팀원으로 초대하기
      </InviteButton>
      <InviteModal
        pid={pid}
        isOpen={isOpen}
        applicant={applicant}
        applicantKey={applicantKey}
        onClickEvent={handleModalStateChange}
      />
    </ApplicantCard>
  );
};

export default MobileApplicantCard;

const ApplicantCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 106px;
  background-color: ${COLORS.white};
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-left: 18px;
`;

const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 12px 0 12px 8px;
`;

const Position = styled.div`
  width: 56px;
  height: 17px;
  font-weight: 500;
  font-size: 12px;
  color: ${COLORS.gray750};
`;

const DisplayName = styled.div`
  width: 81px;
  height: 20px;

  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  color: ${COLORS.gray850};
`;

const Stacks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 7px;

  height: 34px;
`;

const Stack = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${COLORS.gray750};
`;

const InviteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 36px;
  margin: auto 18px;
  background: ${COLORS.violetB400};
  border-radius: 8px;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 10px;
  line-height: 20px;
`;
