import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import { useModal } from 'hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAppliedProject, updateParticipants } from 'apis/postDetail';

interface props {
  isOpen: boolean;
  applicantData: any;
  onClickEvent: () => void;
  pid: string;
  applicantKey: string;
}

const InviteModal = ({
  isOpen,
  applicantData,
  onClickEvent,
  pid,
  applicantKey,
}: props) => {
  const queryClient = useQueryClient();
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);

  const { mutate: applicantMutate } = useMutation(() =>
    updateParticipants(
      pid, //pid로 수정
      applicantData[applicantKey]?.uid, //지원자uid
      true,
    ),
  );

  const { mutate: invitedProjectMutate } = useMutation(
    () => updateAppliedProject(applicantData[applicantKey]?.uid, pid, true),
    {
      onSuccess: () => {
        setTimeout(() => {
          // setTimeout 처리 안하면 모달 바로 꺼져서 1초 뒤에 쿼리 재요청
          queryClient.invalidateQueries(['post', pid]);
        }, 1000);
      },
    },
  );

  return (
    <>
      <Alert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="팀원을 초대했어요!"
        subMsg="현재 참여한 인원에서 확인할 수 있어요!"
        usage="done"
        page="apply"
      />
      <ModalContainer isOpen={isOpen}>
        <ModalWrapper>
          <UserProfileImage src={applicantData[applicantKey]?.profileURL} />
          <UserSkillsContainer>
            {applicantData[applicantKey]?.skills
              .slice(0, 5)
              .map((skill: string) => {
                return <Skills key={skill}>{skill}</Skills>;
              })}
            을/를 경험해 본 팀원이네요!
          </UserSkillsContainer>

          <InviteTitle>
            {applicantData[applicantKey]?.displayName} 님을
          </InviteTitle>
          <InviteTitle>팀원으로 초대할까요?</InviteTitle>

          <MotiveContainer>
            <MotiveTitle>지원 동기</MotiveTitle>
            <MotiveContentWrap>
              <MotiveText>{applicantData[applicantKey]?.motive}</MotiveText>
            </MotiveContentWrap>
            <MotiveButtonContainer>
              <MotiveButton onClick={onClickEvent}>아니오</MotiveButton>
              <MotiveButton
                onClick={() => {
                  onClickEvent();
                  onAlertClickEvent();
                  applicantMutate();
                  invitedProjectMutate();
                  //applicants 데이터 변경
                }}
              >
                네, 초대할게요!
              </MotiveButton>
            </MotiveButtonContainer>
          </MotiveContainer>
        </ModalWrapper>
      </ModalContainer>
    </>
  );
};

export default InviteModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 44.0625rem;
  height: 40.75rem;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  padding: 2.75rem 2.5rem 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;

  width: 39.0625rem;
  height: 30.75rem;
`;

const UserProfileImage = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: ${COLORS.gray100};
`;

const UserSkillsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 1.25rem;
  color: #6b7684;
  margin-top: 2rem;
  margin-bottom: 0.6875rem;
  gap: 0.1875rem;
`;

const Skills = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0rem 0.75rem;
  gap: 0.625rem;
  /* width: 3.5rem; */
  height: 2rem;
  width: fit-content;
  font-size: 0.75rem;
  overflow: hidden;
  background: ${COLORS.gray100};
  border-radius: 2rem;
`;

const InviteTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;

  color: #191f28;
`;

const MotiveContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 39.0625rem;
  height: 14.8125rem;
  margin-top: 1.25rem;
`;

const MotiveTitle = styled.p`
  font-weight: 500;
  font-size: 1.25rem;
`;

const MotiveContentWrap = styled.div`
  margin-top: 0.75rem;
`;

const MotiveText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.625rem 1.75rem;

  width: 39.0625rem;
  height: 12.3125rem;
  border: 0.0625rem solid #ced3db;
  border-radius: 0.25rem;
`;

const MotiveButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.25rem;
  margin-top: 2rem;
  width: 39.0625rem;
  height: 3.75rem;
`;

const MotiveButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 18.9063rem;
  height: 3.75rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.gray100}` : `${COLORS.violetB400}`};
  color: ${(props: { children: string }) =>
    props.children === '아니오' ? `${COLORS.black}` : `${COLORS.white}`};
`;
