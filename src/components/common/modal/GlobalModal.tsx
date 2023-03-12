import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../../recoil/atoms';
import LoginModal from 'components/login/LoginModal';
import NoteModal from '../../popup/NoteModal';
import { modalTypes } from './modalTypes';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';

interface props {
  width?: string;
  height?: string;
  isMobile?: boolean;
}

export default function GlobalModal() {
  const { type } = useRecoilValue(modalState);

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    preventScroll();
    return () => {
      allowScroll();
    };
  }, []);

  return (
    <BackDrop>
      {type === modalTypes.login && <LoginModal />}
      {type === modalTypes.inbox && <NoteModal />}
      {type === modalTypes.outbox && <NoteModal />}
      {type === modalTypes.reply && <NoteModal />}
      {type === modalTypes.sendNote && <NoteModal />}
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

export const GlobalModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  width: ${(props: props) => props.width};
  height: ${(props: props) => props.height};

  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  background: ${COLORS.white};

  border-radius: ${(props: props) => (props.isMobile ? '1rem' : '.75rem')};
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.08);

  overflow: hidden;
`;
