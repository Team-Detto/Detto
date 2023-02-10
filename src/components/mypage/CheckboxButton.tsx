import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface CheckBoxProps {
  type: string;
  name: string;
  isChecked?: boolean;
}

const CheckBoxButton = ({ type, name, isChecked }: CheckBoxProps) => {
  return (
    <CheckBoxWrapper key={type}>
      {isChecked && (
        <CheckBoxInput type="checkbox" id={type} name="skills" defaultChecked />
      )}
      {!isChecked && <CheckBoxInput type="checkbox" id={type} name="skills" />}

      <CheckboxLabel htmlFor={type}>
        <CheckBoxText>{name}</CheckBoxText>
      </CheckboxLabel>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  margin-right: 0.625rem;

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
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 0.5rem 1rem;
  height: 2.25rem;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #f2f4f6;
  font-size: 0.75rem;
  color: #383838;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const CheckBoxText = styled.span``;

export default CheckBoxButton;
