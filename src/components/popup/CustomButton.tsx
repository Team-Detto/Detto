import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

export default function CustomButton({
  label,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
}

const Button = styled.button`
  width: 100%;
  height: 3.75rem;

  font-weight: 600;
  font-size: 17px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
  background-color: ${COLORS.violetB400};
  border-radius: 1rem;

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
