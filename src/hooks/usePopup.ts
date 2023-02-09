import { noteBoxState, notificationBoxState } from './../recoil/atoms';
import { useRecoilState } from 'recoil';
const usePopup = () => {
  const [messageBoxOpen, setMessageBoxOpen] = useRecoilState(noteBoxState);
  const [notificationBoxOpen, setNotificationBoxOpen] =
    useRecoilState(notificationBoxState);

  // 쪽지함 열기 (알림함이 열려있으면 닫기)
  const openMessageBox = () => {
    setMessageBoxOpen(true);
    setNotificationBoxOpen(false);
  };

  // 쪽지함 닫기
  const closeMessageBox = () => {
    setMessageBoxOpen(false);
  };

  // 쪽지함 토글 (알림함이 열려있으면 닫기)
  const toggleMessageBox = () => {
    setMessageBoxOpen(!messageBoxOpen);
    if (!messageBoxOpen) setNotificationBoxOpen(false);
  };

  // 알림함
  const openNotificationBox = () => {
    setNotificationBoxOpen(true);
    setMessageBoxOpen(false);
  };

  // 알림함 닫기 (쪽지함이 열려있으면 닫기)
  const closeNotificationBox = () => {
    setNotificationBoxOpen(false);
  };

  // 알림함 토글 (쪽지함이 열려있으면 닫기)
  const toggleNotificationBox = () => {
    setNotificationBoxOpen(!notificationBoxOpen);
    if (!notificationBoxOpen) setMessageBoxOpen(false);
  };

  return {
    messageBoxOpen,
    notificationBoxOpen,
    closeMessageBox,
    closeNotificationBox,
    openMessageBox,
    openNotificationBox,
    toggleMessageBox,
    toggleNotificationBox,
  };
};

export default usePopup;
