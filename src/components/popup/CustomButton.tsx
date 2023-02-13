import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export default function CustomButton({ label, onClick }: ButtonProps) {
  return <Button onClick={onClick}>{label}</Button>;
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
  background-color: ${COLORS.violetA400};
  border-radius: 1rem;

  &:hover {
    background-color: ${COLORS.violetA300};
  }
`;
