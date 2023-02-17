import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useModal } from 'hooks';
import { useState } from 'react';
import InviteModal from './modals/InviteModal';

const ApplicantListArea = ({ projectData, pid }: any) => {
  const { applicants } = projectData;
  const [applicantKey, setApplicantKey] = useState('');
  const { isOpen, handleModalStateChange } = useModal(false);

  let countFlag = 0;
  return (
    <ApplicantListContainer>
      <ApplicantListTitle>지원자 목록</ApplicantListTitle>
      <ApplicantListContent>
        {applicants &&
          Object.keys(applicants).map((key) => {
            if (applicants[key]?.recruit === false) {
              countFlag += 1;
              return (
                <ApplicantWrap key={applicants[key]?.uid}>
                  <ProfileImage src={applicants[key]?.profileURL} />
                  <NicknameDiv>{applicants[key]?.displayName}</NicknameDiv>
                  <PositionDiv>{applicants[key]?.position}</PositionDiv>

                  <StackContainer>
                    <StackWrap>
                      {applicants[key]?.skills.slice(0, 3).map((skill: any) => {
                        return <StackDiv key={skill}>{skill}</StackDiv>;
                      })}
                    </StackWrap>
                    <StackWrap>
                      {applicants[key]?.skills.slice(3, 6).map((skill: any) => {
                        return <StackDiv key={skill}>{skill}</StackDiv>;
                      })}
                    </StackWrap>
                  </StackContainer>
                  <InviteButton
                    onClick={() => {
                      handleModalStateChange();
                      setApplicantKey(key);
                    }}
                  >
                    지원자 정보 보기
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
            }
          })}
      </ApplicantListContent>
      {countFlag === 0 && (
        <CannotFoundApplicant>아직 지원자가 없어요 :/</CannotFoundApplicant>
      )}
    </ApplicantListContainer>
  );
};

export default ApplicantListArea;

const ApplicantListContainer = styled.div`
  padding: 5rem 6.0625rem;
`;

const ApplicantListTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ApplicantListContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.625rem;
  margin-top: 3.5625rem;
`;

const ApplicantWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 15.5rem;
  height: 22.625rem;
  border-radius: 0.625rem;
  padding: 0 1.25rem;
  margin-bottom: 0.625rem;
`;

const ProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
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

const CannotFoundApplicant = styled.div`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: ${COLORS.gray500};
`;
