import { logEvent } from '@amplitude/analytics-browser';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoData, getUserProjectList } from 'apis/mypageUsers';
import { modalTypes } from 'components/common/modal/modal';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  amplitudeNeedToButtonClick,
  getCurrentPathName,
} from 'utils/amplitude';
import { concatSkills } from 'utils/skills';
import { staleTime } from 'utils/staleTime';
import useAuth from './useAuth';
import useGlobalModal from './useGlobalModal';
import useIsMobile from './useIsMobile';
import useProjectList from './useProjectList';

const usePubicProfile = () => {
  const params = useParams();
  const pid = params.id as string; //받는사람 id
  const { uid } = useAuth(); //보내는 사람 id (현재 로그인한 유저)
  const { activeProjectTab, handleProjectTabClick, setActiveProjectTab } =
    useProjectList();
  const { openModalWithData, openModal } = useGlobalModal();
  const isMobile = useIsMobile();

  const { data: userInfoData } = useQuery({
    queryKey: ['users', pid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  const { data: userProjectListsData } = useQuery({
    queryKey: ['myProjects', pid],
    queryFn: getUserProjectList,
    staleTime: staleTime.myProjects,
    enabled: !!pid,
  });

  const handleSendNoteButtonClick = () => {
    openModalWithData(modalTypes.sendNote, {
      id: 'id', //addDoc이라 id 필요없음
      senderUid: uid,
      receiverUid: pid,
      date: 0,
      title: '',
      content: '',
      isRead: false,
    });
    amplitudeNeedToButtonClick('sendNoteModal', 'sendNote');
  };

  const stacks = concatSkills(
    userInfoData?.plannerStack,
    userInfoData?.designerStack,
    userInfoData?.developerStack,
  );

  useEffect(() => {
    setActiveProjectTab('currentProjects');
    logEvent('Visit Page', {
      from: `${getCurrentPathName()}`,
      to: 'none',
      name: 'puplic_profile',
    });
  }, []);

  return {
    uid,
    userInfoData,
    isMobile,
    activeProjectTab,
    handleProjectTabClick,
    userProjectListsData,
    handleSendNoteButtonClick,
    stacks,
    openModal,
  };
};

export default usePubicProfile;
