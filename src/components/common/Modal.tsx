import React from 'react';
import styled from '@emotion/styled';

interface props {
  isOpen: boolean;
  width?: string;
  height?: string;
  children: React.ReactNode;
}

// Modal 컴포넌트를 children으로 사용하기 때문에 UI를 만들어서 사용하면 됨
// 열기 닫기는 useModal을 활용

const Modal = ({ isOpen, width, height, children }: props) => {
  return (
    <ModalBackDrop isOpen={isOpen}>
      <ModalContainer isOpen={isOpen} width={width} height={height}>
        {children}
      </ModalContainer>
    </ModalBackDrop>
  );
};

const ModalBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props: props) => (props.isOpen ? 'block' : 'none')};
`;
const ModalContainer = styled.div`
  position: fixed;
  // width height 값 props로 받아와서 조절
  width: ${(props: props) => props.width};
  height: ${(props: props) => props.height};
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  display: ${(props: props) => (props.isOpen ? 'block' : 'none')};
`;

export default Modal;
