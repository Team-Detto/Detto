import usePopup from 'hooks/usePopup';

export default function MessageBox() {
  const {
    messageBoxOpen,
    // setMessageBoxOpen
  } = usePopup();

  return <>{messageBoxOpen && <div>쪽지함</div>}</>;
}
