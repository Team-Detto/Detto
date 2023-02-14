import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useRecoilValue } from 'recoil';
import { modalState } from '../recoil/atoms';
import LoginModal from 'components/login/LoginModal';
import NoteModal from './popup/NoteModal';

interface props {
  width?: string;
  height?: string;
}

const LOGIN = 'login';
const INBOX = 'inbox';
const OUTBOX = 'outbox';
const REPLY = 'reply';

export default function ModalContainer() {
  const { isOpen, width, height, type } = useRecoilValue(modalState);

  if (!isOpen) return null;
  return (
    <BackDrop>
      <Container width={width} height={height}>
        {type === LOGIN && <LoginModal />}
        {type === INBOX && <NoteModal />}
        {type === OUTBOX && <NoteModal />}
        {type === REPLY && <NoteModal />}
      </Container>
    </BackDrop>
  );
}

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(191, 191, 191, 0.05);
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  // width height 값 props로 받아와서 조절
  width: ${(props: props) => props.width};
  height: ${(props: props) => props.height};

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  /* padding: 15px; */
  background: ${COLORS.white};

  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);

  overflow: hidden;
`;
