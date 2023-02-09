import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms';

type Props = {
  page?: number;
};

export default function LoginModal({ page }: Props) {
  const [modal, setModal] = useRecoilState(modalState);

  useEffect(() => {
    if (page === 0) {
      setModal({
        ...modal,
        height: '503px',
        width: '657px',
      });
    }
  }, [page]);

  return <Container>로그인 모달</Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 6.25rem;
  top: 3.75rem;

  width: 28.5625rem;
  height: 21.4375rem;
  margin: auto;

  background-color: pink;
`;
