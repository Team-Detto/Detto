import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface CheckBoxProps {
  type: string;
  name: string;
  isChecked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxButton = ({ type, name, isChecked, onChange }: CheckBoxProps) => {
  return (
    <CheckBoxWrapper key={type}>
      {isChecked && (
        <CheckBoxInput
          type="checkbox"
          id={type}
          name="skills"
          value={type}
          defaultChecked
          onChange={onChange}
        />
      )}
      {!isChecked && (
        <CheckBoxInput
          type="checkbox"
          id={type}
          value={type}
          name="skills"
          onChange={onChange}
        />
      )}

      <CheckboxLabel htmlFor={type}>
        <CheckBoxText>{name}</CheckBoxText>
      </CheckboxLabel>
    </CheckBoxWrapper>
  );
};

const CheckBoxWrapper = styled.div`
  margin-right: 0.5rem;

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
    background-color: ${COLORS.violetB500};
    color: ${COLORS.white};
    font-weight: 500;
  }
`;

const CheckboxLabel = styled.label`
  display: block;
  padding: 0.54rem 1.125rem;
  height: 2.25rem;
  cursor: pointer;
  border-radius: 2rem;
  background-color: ${COLORS.gray100};
  font-size: 0.75rem;
  color: #383838;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CheckBoxText = styled.span``;

export default CheckBoxButton;
