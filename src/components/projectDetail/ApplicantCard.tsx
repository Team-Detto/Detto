import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import InviteModal from './InviteModals/InviteModal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { useModal } from 'hooks';

const ApplicantCard = ({ applicant, pid }: any) => {
  const navigate = useNavigate();
  const { isOpen, handleModalStateChange } = useModal(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     preventScroll();
  //     return () => {
  //       allowScroll();
  //     };
  //   }
  // }, [isOpen]);

  return (
    <>
      <ApplicantWrap key={applicant?.uid} isOpen={isOpen}>
        <ProfileImageDiv>
          <ProfileImage
            src={applicant?.profileURL}
            alt={applicant?.displayName}
            referrerPolicy="no-referrer"
            onClick={() => navigate(`/profile/${applicant.uid}`)}
          />

          <HoverText>클릭 시 공개 프로필로 이동</HoverText>
        </ProfileImageDiv>

        <NicknameDiv>{applicant?.displayName}</NicknameDiv>
        <PositionDiv>{applicant?.position}</PositionDiv>
        <StackContainer>
          <StackWrap>
            {applicant?.skills.slice(0, 3).map((skill: any) => {
              return <StackDiv key={skill}>{skill}</StackDiv>;
            })}
          </StackWrap>
          <StackWrap>
            {applicant?.skills.slice(3, 6).map((skill: any) => {
              return <StackDiv key={skill}>{skill}</StackDiv>;
            })}
          </StackWrap>
        </StackContainer>
        <InviteButton
          onClick={() => {
            handleModalStateChange();
          }}
        >
          지원자 정보 보기
        </InviteButton>
      </ApplicantWrap>
      <InviteModal
        isOpen={isOpen}
        applicant={applicant}
        onClickEvent={handleModalStateChange}
        pid={pid}
        applicantKey={applicant?.uid}
      />
    </>
  );
};

export default ApplicantCard;

const ApplicantWrap = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 15.5rem;
  height: 22.625rem;
  border-radius: 0.625rem;
  padding: 0 1.25rem;
  margin-bottom: ${({ isOpen }) => (!isOpen ? '0' : '20rem')};
`;

const ProfileImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8rem;
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  cursor: pointer;
  :hover + div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const HoverText = styled.div`
  position: relative;
  left: 8.125rem;
  background-color: transparent;
  color: ${COLORS.gray300};
  display: none;
`;

const NicknameDiv = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${COLORS.gray800};
`;

const PositionDiv = styled.div`
  font-size: 1rem;
  font-weight: 500;
  width: 5.5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.gray800};
`;

const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15.5rem;
  height: 4.75rem;
  gap: 0.75rem;
`;

const StackWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.5rem;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0rem 0.75rem;
  gap: 0.625rem;
  height: 2rem;
  font-size: 0.75rem;
  overflow: hidden;
  background: ${COLORS.gray100};
  border-radius: 2rem;
`;

const InviteButton = styled.button`
  width: 9.625rem;
  height: 3rem;
  border-radius: 0.625rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-size: 1rem;
  font-weight: 700;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;
