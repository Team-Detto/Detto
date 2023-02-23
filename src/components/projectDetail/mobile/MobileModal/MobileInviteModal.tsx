import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAppliedProject, updateParticipants } from 'apis/postDetail';
import COLORS from 'assets/styles/colors';
import MobileAlert from 'components/common/mobile/MobileAlert';

const MobileInviteModal = ({
  pid,
  isOpen,
  applicant,
  isAlertOpen,
  onClickEvent,
  inviteFunction,
  onAlertClickEvent,
}: any) => {
  const queryClient = useQueryClient();
  const { mutate: MobileInvitedProjectMutate } = useMutation(
    () => updateAppliedProject(applicant?.uid, pid, true),
    {
      onSuccess: () => {
        setTimeout(() => {
          // setTimeout 처리 안하면 모달 바로 꺼져서 1초 뒤에 쿼리 재요청
          queryClient.invalidateQueries(['post', pid]);
        }, 1000);
      },
    },
  );

  const { mutate: applicantMutate } = useMutation(() =>
    updateParticipants(
      pid, //pid로 수정
      applicant?.uid, //지원자uid
      true,
    ),
  );

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClickEvent();
    }
  };

  return (
    <>
      <BackDrop onClick={handleBackDropClick} isOpen={isOpen}>
        <ModalContainer>
          <StackDiv>
            <StackList>
              {applicant.skills.slice(0, 5).map((skill: any) => (
                <Stacks key={skill}>{skill}</Stacks>
              ))}
            </StackList>
            {applicant.skills.length > 0 ? (
              <ApplicantStacks>을/를 할 수 있어요!</ApplicantStacks>
            ) : (
              <ApplicantStacks>
                {applicant.position} 포지션에 지원하셨네요!
              </ApplicantStacks>
            )}
          </StackDiv>
          <NickNameDiv>
            <NickName>{applicant.displayName} 님을</NickName>
            <NickName>팀원으로 초대할까요?</NickName>
            <MotiveDiv>
              <MotiveTitle>지원 동기</MotiveTitle>
              <MotiveContent>{applicant.motive}</MotiveContent>
              <ButtonDiv>
                <Button onClick={onClickEvent}>아니오</Button>
                <Button
                  onClick={() => {
                    inviteFunction();
                    MobileInvitedProjectMutate();
                    applicantMutate();
                  }}
                >
                  초대할게요!
                </Button>
              </ButtonDiv>
            </MotiveDiv>
          </NickNameDiv>
        </ModalContainer>
      </BackDrop>
      <MobileAlert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="지원이 완료되었어요!"
        subMsg="알림으로 결과를 알려드릴게요!"
        page="apply"
      />
    </>
  );
};

export default MobileInviteModal;

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(191, 191, 191, 0.5);
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalContainer = styled.div`
  position: fixed;
  width: 20rem;
  height: 435px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;

  padding: 2rem 1rem 1rem 1rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 2000;
  display: block;
`;

const StackDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 0.5rem;
  height: 3.25rem;
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  /* margin: 0.4rem; */
`;

const Stacks = styled.p`
  font-size: 0.625rem;
  background-color: ${COLORS.gray100};
  border-radius: 0.25rem;
  padding: 0.125rem;
`;

const ApplicantStacks = styled.p`
  height: 1.625rem;
  font-weight: 500;
  font-size: 0.875rem;
  margin-top: 0rem;
  color: ${COLORS.gray750};
  line-height: 1.625rem;
`;

const NickNameDiv = styled.div`
  color: ${COLORS.gray850};
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;
  padding-top: 0.875rem;
  height: 3.25rem;
`;

const NickName = styled.p``;

const MotiveDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 1.5625rem;
  gap: 0.5rem;

  width: 17.125rem;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;
  /* identical to box height, or 1.25rem */

  display: flex;
  align-items: center;
  letter-spacing: -0.02em;

  /* Gary 750 */

  color: #6b7684;
`;

const MotiveContent = styled.div`
  display: flex;
  padding: 0.625rem 1.25rem;
  gap: 1.4375rem;

  width: 17.125rem;
  height: 8.8125rem;
  overflow: scroll;

  border: 0.0625rem solid ${COLORS.gray300};
  border-radius: 0.5rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  display: flex;

  color: ${COLORS.gray900};
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.25rem;
  padding-top: 1.625rem;
  gap: 0.25rem;
`;

const Button = styled.button<{ children: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;

  width: 8.75rem;
  height: 3.25rem;

  background: ${({ children }) =>
    children === '아니오' ? COLORS.gray100 : COLORS.violetB400};

  color: ${({ children }) =>
    children === '아니오' ? COLORS.black : COLORS.white};

  border-radius: 1rem;
`;
