import { getNotifications } from 'apis/notifications';
import { staleTime } from 'utils/staleTime';
import { getInboxNotes } from 'apis/notes';
import { useQueries } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { popupState } from './../recoil/atoms';
import { useRecoilState } from 'recoil';
const usePopup = () => {
  const [popup, setPopup] = useRecoilState(popupState);
  const { uid } = useAuth();

  // 쪽지함 토글 (알림함이 열려있으면 닫기)
  const toggleNoteBox = () => {
    setPopup({
      isNoteOpen: !popup.isNoteOpen,
      isNotificationOpen: false,
      isDropdownOpen: false,
    });
  };

  // 알림함 토글 (쪽지함이 열려있으면 닫기)
  const toggleNotificationBox = () => {
    setPopup({
      isNoteOpen: false,
      isNotificationOpen: !popup.isNotificationOpen,
      isDropdownOpen: false,
    });
  };

  // 모바일 드랍다운 토글 (쪽지함이 열려있으면 닫기)
  const toggleDropdownMenu = () => {
    setPopup({
      isNoteOpen: false,
      isNotificationOpen: false,
      isDropdownOpen: !popup.isDropdownOpen,
    });
  };

  // 팝업 닫기 (페이지 이동 시 모든 팝업을 닫기 위한 목적)
  const closePopup = () => {
    setPopup({
      isNoteOpen: false,
      isNotificationOpen: false,
      isDropdownOpen: false,
    });
  };

  // 쪽지함, 알림함 데이터 가져오기
  const [{ data: notes }, { data: notifications }] = useQueries({
    queries: [
      {
        queryKey: ['inbox', uid],
        queryFn: getInboxNotes,
        staleTime: staleTime.inboxNotes,
        enabled: !!uid,
      },
      {
        queryKey: ['notifications', uid],
        queryFn: getNotifications,
        staleTime: staleTime.notifications,
        enabled: !!uid,
      },
    ],
  });

  // 읽지 않은 쪽지 개수
  const unreadNoteCount =
    notes?.filter(({ isRead }: Partial<Note>) => !isRead).length || 0;

  // 읽지 않은 알림 개수
  const unreadNotificationCount =
    notifications?.filter(({ isRead }: Partial<Notification>) => !isRead)
      .length || 0;

  return {
    popup,
    closePopup,
    toggleNoteBox,
    toggleNotificationBox,
    toggleDropdownMenu,
    notes,
    notifications,
    unreadNoteCount,
    unreadNotificationCount,
  };
};

export default usePopup;
