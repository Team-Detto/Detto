import { IoChevronBack } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { useGlobalModal } from 'hooks';

type ModalNavigatorProps = {
  page: number;
  back?: boolean;
  close?: boolean;
};

export default function ModalNavigator({ back, close }: ModalNavigatorProps) {
  const { modal, openModal, closeModal } = useGlobalModal();

  return (
    <Container>
      {back && (
        <BackButton onClick={() => openModal(modal.type, modal.page - 1)}>
          <IoChevronBack
            style={{ width: '1.5rem', height: '1.5rem', color: COLORS.gray700 }}
          />
        </BackButton>
      )}
      {close && (
        <CloseButton onClick={closeModal}>
          <CgClose
            style={{ width: '1.5rem', height: '1.5rem', color: COLORS.gray700 }}
          />
        </CloseButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  width: 100%;
  height: 1.5rem;

  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
