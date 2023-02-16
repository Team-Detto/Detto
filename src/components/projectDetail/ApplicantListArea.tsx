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
  padding: 5rem 97px;
`;

const ApplicantListTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ApplicantListContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 248px;
  height: 76px;
  gap: 12px;
`;

const StackWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 8px;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  gap: 10px;
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
