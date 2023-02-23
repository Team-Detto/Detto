import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
};

export default function CustomButton({
  label,
  onClick,
  disabled,
  color,
}: ButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled} color={color}>
      {label}
    </Button>
  );
}

const Button = styled.button<{ color?: string }>`
  width: 100%;
  height: 3.75rem;

  font-weight: 600;
  font-size: 17px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ color }) => (color === 'gray' ? COLORS.gray800 : COLORS.white)};
  background-color: ${({ color }) =>
    color === 'gray' ? COLORS.gray100 : COLORS.violetB400};
  border-radius: 1rem;

  :hover {
    background-color: ${({ color }) =>
      color === 'gray' ? COLORS.gray100 : COLORS.violetB300};
  }
  :disabled {
    background-color: ${COLORS.gray100};
  }
`;
