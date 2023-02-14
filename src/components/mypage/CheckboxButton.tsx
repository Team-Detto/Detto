import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface CheckBoxProps {
  type: string;
  name: string;
  stackName?: string;
  isChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxButton = ({
  type,
  name,
  isChecked,
  onChange,
  stackName,
}: CheckBoxProps) => {
  return (
    <CheckBoxWrapper key={type} isStack={stackName ? true : false}>
      {isChecked && (
        <CheckBoxInput
          type="checkbox"
          id={type + stackName}
          name={stackName ? stackName : 'skills'}
          value={type}
          defaultChecked
          onChange={onChange}
        />
      )}
      {!isChecked && (
        <CheckBoxInput
          type="checkbox"
          id={type + stackName}
          value={type}
          name={stackName ? stackName : 'skills'}
          onChange={onChange}
        />
      )}

      <CheckboxLabel htmlFor={type + stackName}>
        <CheckBoxText>{name}</CheckBoxText>
      </CheckboxLabel>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div<{ isStack: boolean }>`
  margin-right: ${({ isStack }) => (isStack ? '0' : '0.5rem')};
  margin-bottom: ${({ isStack }) => (isStack ? '0.5rem' : '0')};

  &:last-child {
    margin-right: 0;
  }
`;

const CheckBoxInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  &:checked + label {
    background-color: ${COLORS.violetB400};
    color: ${COLORS.white};
    font-weight: 500;
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 0.45rem 1.125rem;
  height: 2.25rem;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #f2f4f6;
  font-size: 0.9rem;
  color: #383838;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CheckBoxText = styled.span``;

export default CheckBoxButton;
