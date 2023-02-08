import usePopup from 'hooks/usePopup';

export default function NotificationBox() {
  const {
    notificationBoxOpen,
    // setNotificationBoxOpen
  } = usePopup();

  return <>{notificationBoxOpen && <div>알림함</div>}</>;
}
