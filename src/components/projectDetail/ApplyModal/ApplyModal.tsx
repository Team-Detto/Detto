import styled from '@emotion/styled';
import Alert from 'components/common/Alert';
import { useAuth, useIsMobile, useModal, useToastPopup } from 'hooks';
import { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { positionList } from 'utils/positions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateApplicants, updateAppliedProject } from 'apis/postDetail';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import ApplyModalButtonArea from './ApplyModalButtonArea';
import ApplyMotiveArea from './ApplyMotiveArea';
import ApplyPositionArea from './ApplyPositionArea';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import COLORS from 'assets/styles/colors';
import MobileAlert from 'components/common/mobile/MobileAlert';
import { staleTime } from 'utils/staleTime';

interface props {
  isOpen: boolean;
  message: string;
  onClickEvent: () => void;
  positions: Object;
  pid: string;
}

const ApplyModal = ({
  isOpen,
  message,
  onClickEvent,
  positions,
  pid,
}: props) => {
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);

  const {
    isOpen: isMobileAlertOpen,
    handleModalStateChange: onMobileAlertClickEvent,
  } = useModal(false);

  const { uid } = useAuth();
  const [motive, setMotive] = useState('');
  const [clickValue, setClickValue] = useState(-1);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  //지원자 데이터 가져오기
  const { data: userData } = useQuery({
    queryKey: ['users', uid],
    queryFn: () => findWithCollectionName('users', uid),
    staleTime: staleTime.users,
    enabled: !!uid,
  });

  //지원한 포지션에 맞는 스택 가져오기 위한 스위치문
  let skills: string[] = [];
  switch (clickValue) {
    case 0: //기획
      skills = userData?.plannerStack;
      break;
    case 1: //디자인
      skills = userData?.designerStack;
      break;
    case 2: //프론트엔드
      skills = userData?.developerStack;
      break;
    case 3: //백엔드
      skills = userData?.developerStack;
      break;

    default:
      skills = [];
      break;
  }

  const { mutate: applicantMutate } = useMutation(() =>
    updateApplicants(
      pid, //pid로 수정
      uid,
      userData?.displayName,
      userData?.photoURL,
      skills,
      positionList[clickValue].name,
      motive,
      false,
    ),
  );

  const queryClient = useQueryClient();
  //지원하기 클릭 시 appliedProject 필드에 pid 추가
  const { mutate: projectMutate } = useMutation(
    () =>
      updateAppliedProject(
        uid, //현재 유저의 uid
        pid, //현재 프로젝트의 pid
        false, //초대 여부
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]);
      },
    },
  );

  useEffect(() => {
    if (isOpen) {
      preventScroll();
      return () => {
        allowScroll();
      };
    }
  }, [isOpen]);

  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClickEvent();
    }
  };

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        <BackDrop onClick={handleBackDropClick} isOpen={isOpen}>
          <MobileModalContainer>
            {showToast && (
              <ValidationToastPopup message={ToastMessage} top={-2} />
            )}
            <MobileModalTitle>{message}</MobileModalTitle>
            <MobileContentContainer>
              {/* 포지션 버튼 */}
              <ApplyPositionArea
                clickValue={clickValue}
                setClickValue={setClickValue}
                version="mobile"
                positions={positions}
              />
              {/* 지원동기 */}
              <ApplyMotiveArea
                motive={motive}
                setMotive={setMotive}
                version="mobile"
              />
            </MobileContentContainer>
            {/* 아니오, 지원하기 버튼 */}
            <ApplyModalButtonArea
              userData={userData}
              motive={motive}
              setMotive={setMotive}
              clickValue={clickValue}
              setClickValue={setClickValue}
              onClickEvent={onClickEvent}
              onAlertClickEvent={onMobileAlertClickEvent}
              applicantMutate={applicantMutate}
              projectMutate={projectMutate}
              handleToastPopup={handleToastPopup}
              pid={pid}
            />
          </MobileModalContainer>
        </BackDrop>
        <MobileAlert
          isOpen={isMobileAlertOpen}
          onClickEvent={onMobileAlertClickEvent}
          mainMsg="지원이 완료되었어요!"
          subMsg="알림으로 결과를 알려드릴게요!"
          page="apply"
        />
      </>
    );
  }

  return (
    <>
      <WebModalContainer isOpen={isOpen}>
        {showToast && <ValidationToastPopup message={ToastMessage} top={2} />}
        <WebModalTitle>{message}</WebModalTitle>
        <WebContentContainer>
          {/* 포지션 버튼 */}
          <ApplyPositionArea
            positions={positions}
            clickValue={clickValue}
            setClickValue={setClickValue}
          />
          {/* 지원동기 */}
          <ApplyMotiveArea motive={motive} setMotive={setMotive} />
        </WebContentContainer>
        {/* 아니오, 지원하기 버튼 */}
        <ApplyModalButtonArea
          userData={userData}
          motive={motive}
          setMotive={setMotive}
          clickValue={clickValue}
          setClickValue={setClickValue}
          onClickEvent={onClickEvent}
          onAlertClickEvent={onAlertClickEvent}
          applicantMutate={applicantMutate}
          projectMutate={projectMutate}
          handleToastPopup={handleToastPopup}
          pid={pid}
        />
      </WebModalContainer>
      {/* 지원성공Alert*/}
      <Alert
        isOpen={isAlertOpen}
        onClickEvent={onAlertClickEvent}
        mainMsg="지원이 완료되었어요!"
        subMsg="알림으로 결과를 알려드릴게요!"
        page="apply"
      />
    </>
  );
};

export default ApplyModal;

const WebModalContainer = styled.div`
  position: fixed;
  width: 41.0625rem;
  height: 34.375rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 1.25rem 1rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const WebModalTitle = styled.p`
  height: 2.75rem;
  font-weight: 700;
  font-size: 1.75rem;
  margin-top: 2rem;
`;

const WebContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  margin-top: 1.25rem;

  width: 39.0625rem;
  height: 21.0625rem;
`;

//모바일
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1500;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
  background: rgba(191, 191, 191, 0.5);
`;

const MobileModalContainer = styled.div`
  position: fixed;
  width: 20rem;
  height: 26.1875rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  text-align: center;
  padding: 1.25rem 1rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 2000;
  display: block;
`;

const MobileModalTitle = styled.p`
  height: 1.625rem;
  font-weight: 700;
  font-size: 1.125rem;
  margin-top: 0rem;
`;

const MobileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  margin-top: 1.125rem;

  width: 100%;
`;
