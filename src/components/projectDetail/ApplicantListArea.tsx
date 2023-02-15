import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useModal } from 'hooks';
import { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import InviteModal from './modals/InviteModal';

const ApplicantListArea = ({ projectData, pid }: any) => {
  const { applicants } = projectData;
  const [applicantKey, setApplicantKey] = useState('');
  const { isOpen, handleModalStateChange } = useModal(false);

  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <ApplicantListContainer>
      <ApplicantListTitle>지원자 목록</ApplicantListTitle>
      <ApplicantListContent>
        {applicants && applicants ? (
          // applicants?.forEach((applicant: any, idx: number) => {
          Object.keys(applicants).map((key) => {
            // console.log('test', applicants[key]);
            if (applicants[key]?.recruit === false)
              return (
                <ApplicantWrap key={applicants[key]?.uid}>
                  <ProfileImage src={applicants[key]?.profileURL} />
                  <NicknameDiv>{applicants[key]?.displayName}</NicknameDiv>
                  <PositionDiv>{applicants[key]?.position}</PositionDiv>
                  <StackWrap>
                    {applicants[key]?.skills.map((skill: any) => {
                      return <StackDiv key={skill}>{skill}</StackDiv>;
                    })}
                  </StackWrap>
                  <InviteButton
                    onClick={() => {
                      handleModalStateChange();
                      setApplicantKey(key);
                      // console.log('key', key);
                    }}
                  >
                    팀원으로 초대하기
                    {/* 이거 누르면 지원한 사람의 uid가 전달돼야함 */}
                  </InviteButton>
                  <InviteModal
                    isOpen={isOpen}
                    applicantData={applicants}
                    onClickEvent={handleModalStateChange}
                    pid={pid}
                    applicantKey={applicantKey}
                  />
                </ApplicantWrap>
              );
          })
        ) : (
          <CannotFoundApplicant>아직 지원자가 없습니다 :/</CannotFoundApplicant>
        )}
      </ApplicantListContent>
    </ApplicantListContainer>
  );
};

export default ApplicantListArea;

const ApplicantListContainer = styled.div`
  padding: 5rem 97px;
`;

const ApplicantListTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ApplicantListContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 58px;
  margin-top: 57px;
`;

const ApplicantWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 248px;
  height: 362px;
  border-radius: 0.625rem;
  padding: 0 1.25rem;
  margin-bottom: 0.625rem;
`;

const ProfileImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
`;

const NicknameDiv = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${COLORS.gray800};
`;

const PositionDiv = styled.div`
  font-size: 16px;
  font-weight: 500;
  width: 88px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.gray800};
`;

const StackWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 248px;
  height: 76px;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  gap: 10px;
  /* width: 56px; */
  height: 32px;
  font-size: 12px;
  overflow: hidden;
  background: ${COLORS.gray100};
  border-radius: 32px;
`;

const InviteButton = styled.button`
  width: 154px;
  height: 48px;
  border-radius: 0.625rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-size: 16px;
  font-weight: 700;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

const CannotFoundApplicant = styled.div`
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;
