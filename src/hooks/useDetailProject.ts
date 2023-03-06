import { logEvent } from '@amplitude/analytics-browser';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import {
  deleteApplicant,
  firebaseGetIsApplicantRequest,
  updateRecruiting,
} from 'apis/postDetail';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentPathName } from 'utils/amplitude';
import { staleTime } from 'utils/staleTime';
import useAuth from './useAuth';
import useIsMobile from './useIsMobile';
import useModal from './useModal';
import useNotification from './useNotification';

const useDetailProject = () => {
  const params = useParams();
  const pid = params.id as string;
  const isMobile = useIsMobile();
  const { sendNotification } = useNotification();

  //프로젝트 데이터 조회
  const { data: projectData } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => findWithCollectionName('post', pid),
    staleTime: staleTime.project,
    enabled: !!pid,
    suspense: true,
  });

  const { uid } = useAuth(); // 현재 사용자
  const writer = projectData?.uid; //글쓴이
  const applicants = projectData?.applicants;

  const [{ data: userData }, { data: isApplicant }] = useQueries({
    queries: [
      //글쓴이 조회
      {
        queryKey: ['users', writer],
        queryFn: () => findWithCollectionName('users', writer),
        staleTime: staleTime.user,
        enabled: !!writer,
        suspense: true,
      },
      // 현재 유저가 프로젝트 지원자 인가 조회
      {
        queryKey: ['post', applicants],
        queryFn: () => firebaseGetIsApplicantRequest(pid, uid),
        staleTime: staleTime.project,
        suspense: true,
      },
    ],
  });

  const queryClient = useQueryClient();
  const { mutate: updateRecruitingMutate } = useMutation(
    () => updateRecruiting(pid, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]); //마감하기 버튼 성공시 렌더링
        queryClient.invalidateQueries(['post', 'mostViewed']);
        queryClient.invalidateQueries(['post', 'mostLiked']);
      },
    },
  );

  const { mutate: deleteApplicantMutate } = useMutation(
    () => deleteApplicant(pid, uid),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]); //지원취소 버튼 성공시 렌더링
      },
    },
  );

  // 지원자에게 마감 알림 보내기
  const sendDeadlineNotificationToApplicants = () => {
    // applicants map을 array로 변경
    const applicantsUidArray = Object.keys(applicants);

    applicantsUidArray.forEach((applicant: any) => {
      if (!params.id) return;
      sendNotification({
        title: '지원하신 프로젝트의 모집이 마감되었습니다.',
        receiverUid: applicant,
        link: {
          type: 'project',
          id: params.id,
        },
      });
    });
  };

  // 마감하기 버튼 이벤트 핸들러
  const handleAuthorButtonClick = () => {
    sendDeadlineNotificationToApplicants();
    updateRecruitingMutate();
    handleCloseModalCloseChange();
  };

  const {
    isOpen: isApply,
    handleModalOpenChange: handleApplyModalOpenChange,
    handleModalCloseChange: handleApplyModalCloseChange,
  } = useModal(false);

  const {
    isOpen: isClose,
    handleModalOpenChange: handleCloseModalOpenChange,
    handleModalCloseChange: handleCloseModalCloseChange,
  } = useModal(false);

  useEffect(() => {
    logEvent('Visit Page', {
      from: `${getCurrentPathName()}`,
      to: 'none',
      name: 'project_detail',
    });
  }, []);
  return {
    pid,
    uid,
    projectData,
    userData,
    isApplicant,
    isMobile,
    isApply,
    isClose,
    handleApplyModalOpenChange,
    handleApplyModalCloseChange,
    handleCloseModalOpenChange,
    handleCloseModalCloseChange,
    handleAuthorButtonClick,
    deleteApplicantMutate,
  };
};

export default useDetailProject;
