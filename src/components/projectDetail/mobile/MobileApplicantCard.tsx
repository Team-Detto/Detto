import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import UserStacks from 'components/publicProfile/UserStacks';
import InviteModal from '../InviteModals/InviteModal';
import { useModal } from 'hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';

const MobileApplicantCard = ({ pid, applicant, applicantUid }: any) => {
  const navigate = useNavigate();
  const { isOpen, handleModalStateChange } = useModal(false);
  const [applicantKey, setApplicantKey] = useState('');

  // 유저 정보 받아오는 쿼리
  const { data: applierInfoData }: any = useQuery({
    queryKey: ['users', applicantUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
  });

  return (
    <ApplicantCard>
      <ProfileImg
        src={applierInfoData.photoURL}
        alt={applierInfoData.displayName}
        referrerPolicy="no-referrer"
        onClick={() => navigate(`/profile/${applicant.uid}`)}
      />
      <UserInfoDiv>
        <Position>{applicant.position}</Position>
        <DisplayName>{applierInfoData.displayName}</DisplayName>
        <Stacks>
          <UserStacks stacks={applicant.skills} version="mobile"></UserStacks>
        </Stacks>
      </UserInfoDiv>
      <InviteButton
        onClick={() => {
          handleModalStateChange();
          setApplicantKey(applicantUid);
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
  height: 6.625rem;
  background-color: ${COLORS.white};
`;

const ProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 3.125rem;
  margin-left: 1.125rem;
`;

const UserInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 0.75rem 0 0.75rem 0.5rem;
`;

const Position = styled.div`
  width: 3.5rem;
  height: 1.0625rem;
  font-weight: 500;
  font-size: 0.75rem;
  color: ${COLORS.gray750};
`;

const DisplayName = styled.div`
  width: 5.0625rem;
  height: 1.25rem;

  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;

  color: ${COLORS.gray850};
`;

const Stacks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.4375rem;

  height: 2.125rem;
`;

const InviteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11.25rem;
  height: 2.25rem;
  margin: auto 1.125rem;
  background: ${COLORS.violetB400};
  border-radius: 0.5rem;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: 0.625rem;
  line-height: 1.25rem;
`;
