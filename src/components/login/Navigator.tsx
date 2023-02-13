import { IoChevronBack } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { useGlobalModal } from 'hooks';

type NavigatorProps = {
  page: number;
};

export default function Navigator({ page }: NavigatorProps) {
  const { openModal, closeModal } = useGlobalModal();

  return (
    <Container>
      <BackButton onClick={() => openModal('login', page - 1)}>
        <IoChevronBack
          style={{ width: '1.5rem', height: '1.5rem', color: COLORS.gray700 }}
        />
      </BackButton>
      <CloseButton onClick={() => closeModal()}>
        <CgClose
          style={{ width: '1.5rem', height: '1.5rem', color: COLORS.gray700 }}
        />
      </CloseButton>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
