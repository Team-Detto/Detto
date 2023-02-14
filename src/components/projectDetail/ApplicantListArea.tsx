import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useModal } from 'hooks';
import ApplyModal from './ApplyModal';
import UserInformationModal from './InviteModal';

const ApplicantListArea = ({ projectData, userData }: any) => {
  const { applicants } = projectData;
  const { isOpen, handleModalStateChange } = useModal(false);
  return (
    <ApplicantListContainer>
      <ApplicantListTitle>지원자 목록</ApplicantListTitle>
      <ApplicantListContent>
        {applicants ? (
          applicants?.map((applicant: any) => {
            return (
              <ApplicantWrap>
                <ProfileImage src={applicant.profileURL} />
                <NicknameDiv>
                  {applicant.displayName ?? `사용자displayName`}
                </NicknameDiv>
                <PositionDiv>
                  {applicant.position ?? `사용자position`}
                </PositionDiv>
                {/* 개발, 디자인, 기획 스킬 모아서 배열로 만든 후에 map돌리기 */}
                <StackWrap>
                  {applicant.skills.map((skill: any) => {
                    return <StackDiv>{skill}</StackDiv>;
                  }) ?? `사용자stack`}
                </StackWrap>
                <InviteButton onClick={handleModalStateChange}>
                  팀원으로 초대하기
                </InviteButton>
                <UserInformationModal
                  isOpen={isOpen}
                  applicantData={applicant}
                  message="프로젝트를 지원해볼까요?"
                  onClickEvent={handleModalStateChange}
                  onCloseEvent={handleModalStateChange}
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
