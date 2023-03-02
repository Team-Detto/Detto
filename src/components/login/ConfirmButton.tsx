import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

type ButtonProps = {
  onClick: () => void;
};

export default function ConfirmButton({ onClick }: ButtonProps) {
  return <Button onClick={onClick}>확인</Button>;
}

const Button = styled.button`
  width: 100%;
  height: 3.875rem;

  font-weight: 600;
  font-size: 17px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${COLORS.white};
  background-color: ${COLORS.violetB400};
  border-radius: 1rem;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
