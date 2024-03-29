import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import {
  useAuth,
  useGlobalModal,
  useIsMobile,
  useModal,
  useNotification,
} from 'hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateAppliedProject, updateParticipants } from 'apis/postDetail';
import { modalTypes } from 'components/common/modal/modalTypes';
import MobileInviteModal from '../mobile/MobileModal/MobileInviteModal';
import {
  amplitudeNeedToButtonClick,
  amplitudeToNoneButtonClick,
} from 'utils/amplitude';
import { getUserInfoData } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';

interface props {
  isOpen: boolean;
  applicant: any;
  onClickEvent: () => void;
  pid: string;
  applicantKey: string;
}

const InviteModal = ({
  isOpen,
  applicant,
  onClickEvent,
  pid,
  applicantKey,
}: props) => {
  const user = useAuth(); //보내는 사람 id (현재 로그인한 유저)
  const { openModalWithData } = useGlobalModal();
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);
  const { sendNotification } = useNotification();

  // 유저 정보 받아오는 쿼리
  const { data: applierInfoData }: any = useQuery({
    queryKey: ['users', applicantKey],
    queryFn: getUserInfoData,
    staleTime: staleTime.users,
    enabled: !!applicantKey,
  });

  const { mutate: applicantMutate } = useMutation(() =>
    updateParticipants(
      pid, //pid로 수정
      applicantKey, //지원자uid
      true,
    ),
  );
  const queryClient = useQueryClient();
  const { mutate: invitedProjectMutate } = useMutation(
    () => updateAppliedProject(applicantKey, pid, true),
    {
      onSuccess: () => {
        setTimeout(() => {
          // setTimeout 처리 안하면 모달 바로 꺼져서 1초 뒤에 쿼리 재요청
          queryClient.invalidateQueries(['post', pid]);
        }, 1000);
      },
    },
  );

  const sendInviteNotification = () => {
    // 초대 알림 보내기
    sendNotification({
      title: `${applierInfoData.displayName}님의 프로젝트에 초대되었습니다. 🎉`,
      receiverUid: applicantKey,
      link: {
        type: 'project',
        id: pid,
      },
    });
  };

  const handleSendNoteButtonClick = () => {
    openModalWithData(modalTypes.sendNote, {
      id: 'id', //addDoc이라 id 필요없음
      senderUid: user.uid,
      receiverUid: applicantKey,
      date: 0,
      title: '',
      content: '',
      isRead: false,
    });
    onClickEvent();
    amplitudeNeedToButtonClick('sendNoteModal', 'sendNote');
  };

  const inviteFunction = () => {
    onClickEvent();
    onAlertClickEvent();
    sendInviteNotification();
  };

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <MobileInviteModal
        pid={pid}
        isOpen={isOpen}
        applicant={applicant}
        applierInfoData={applierInfoData}
        isAlertOpen={isAlertOpen}
        onClickEvent={onClickEvent}
        inviteFunction={inviteFunction}
        onAlertClickEvent={onAlertClickEvent}
      />
    );
  }

  return (
    <>
      <Alert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="팀원을 초대했어요!"
        subMsg="현재 참여 중인 인원에서 확인할 수 있어요!"
        page="apply"
      />
      <ModalContainer isOpen={isOpen}>
        <ModalWrapper>
          <ProfileToMessageContainer>
            <UserProfileImage
              src={applierInfoData?.photoURL}
              alt={applierInfoData?.displayName}
              referrerPolicy="no-referrer"
            />
            <MessageSendButton
              onClick={() => {
                handleSendNoteButtonClick();
              }}
            >
              쪽지보내기
            </MessageSendButton>
          </ProfileToMessageContainer>
          <UserSkillsContainer>
            {applicant?.skills.length > 0 ? (
              <StackList>
                {applicant?.skills.slice(0, 5).map((skill: string) => {
                  return <Skills key={skill}>{skill}</Skills>;
                })}
                을/를 할 수 있어요!
              </StackList>
            ) : (
              <StackList>
                <Skills>{applicant?.position}</Skills> 포지션에 지원하셨네요!
              </StackList>
            )}
          </UserSkillsContainer>

          <InviteTitle>{applierInfoData?.displayName} 님을</InviteTitle>
          <InviteTitle>팀원으로 초대할까요?</InviteTitle>

          <MotiveContainer>
            <MotiveTitle>지원 동기</MotiveTitle>
            <MotiveContentWrap>
              <MotiveText>{applicant?.motive}</MotiveText>
            </MotiveContentWrap>
            <MotiveButtonContainer>
              <MotiveButton
                onClick={() => {
                  onClickEvent();
                  amplitudeToNoneButtonClick('invite_no');
                }}
              >
                아니오
              </MotiveButton>
              <MotiveButton
                onClick={() => {
                  inviteFunction();
                  invitedProjectMutate();
                  applicantMutate();
                  amplitudeToNoneButtonClick('invite_yes');
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
  background: ${COLORS.white};
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

const ProfileToMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* gap: 1.25rem; */
`;

const UserProfileImage = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background-color: ${COLORS.gray100};
`;

const MessageSendButton = styled.button`
  width: 9.8125rem;
  height: 3.5rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 0.625rem;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserSkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 1.25rem;
  color: ${COLORS.gray750};
  margin-top: 2rem;
  margin-bottom: 0.6875rem;
  gap: 0.1875rem;
`;

const StackList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.9375rem;
  align-items: center;
`;

const Skills = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  gap: 0.625rem;
  height: 2rem;
  width: fit-content;
  font-size: 0.75rem;
  /* overflow: hidden; */
  background: ${COLORS.gray100};
  border-radius: 1rem;
  color: ${COLORS.violetB500};
`;

const InviteTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;

  color: ${COLORS.gray900};
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
  border: 0.0625rem solid ${COLORS.gray300};
  border-radius: 0.25rem;

  overflow: overlay;
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
