import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import { updateApplicants, updateAppliedProject } from 'apis/postDetail';
import { useEffect, useState } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import { positionList } from 'utils/positions';
import { staleTime } from 'utils/staleTime';
import useAuth from './useAuth';
import useModal from './useModal';
import useNotification from './useNotification';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  pid: string;
}

const useApply = ({ isOpen, onClickEvent, pid }: props) => {
  const { isOpen: isAlertOpen, handleModalStateChange: onAlertClickEvent } =
    useModal(false);

  const {
    isOpen: isMobileAlertOpen,
    handleModalStateChange: onMobileAlertClickEvent,
  } = useModal(false);

  const { uid } = useAuth();
  const [motive, setMotive] = useState('');
  const [clickValue, setClickValue] = useState(-1);

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

  const { data: projectData } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => findWithCollectionName('post', pid),
    staleTime: staleTime.project,
    enabled: !!pid,
  });
  const { sendNotification } = useNotification();
  // 글쓴이에게 지원 알림 보내기
  const sendApplyNotificationToWriter = () => {
    if (!userData || !projectData) return;
    sendNotification({
      title: `${userData.displayName}님이 프로젝트에 지원하였습니다.`,
      receiverUid: projectData.uid,
      link: {
        type: 'project',
        id: pid,
      },
    });
  };

  const handleResetButtonClick = () => {
    setMotive(''); //지원동기 초기화
    setClickValue(-1); //포지션 초기화
    onClickEvent(); //모달 닫기
  };

  const handleApplyButtonClick = () => {
    //지원 성공
    handleResetButtonClick();
    onClickEvent();
    onMobileAlertClickEvent();
    onAlertClickEvent(); //지원성공 모달 띄우기
    applicantMutate(userData?.uid); //지원자 데이터 삽입
    projectMutate(); //지원한 프로젝트 데이터 삽입
    sendApplyNotificationToWriter(); //글쓴이에게 지원 알림 보내기
  };
  return {
    motive,
    setMotive,
    clickValue,
    setClickValue,
    onMobileAlertClickEvent,
    isMobileAlertOpen,
    handleResetButtonClick,
    handleApplyButtonClick,
    onAlertClickEvent,
    isAlertOpen,
  };
};
export default useApply;
