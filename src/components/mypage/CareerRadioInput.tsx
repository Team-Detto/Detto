import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface CareerRadioInputProps {
  juniorFlag: boolean;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CareerRadioInput = ({
  juniorFlag,
  id,
  value,
  onChange,
}: CareerRadioInputProps) => {
  return (
    <>
      {juniorFlag ? (
        <InfoRadioBoxInput
          type="radio"
          id={id}
          name="isJunior"
          defaultValue={value}
          defaultChecked
          onChange={onChange}
        />
      ) : (
        <InfoRadioBoxInput
          type="radio"
          id={id}
          defaultValue={value}
          name="isJunior"
          onChange={onChange}
        />
      )}

      <InfoRadioBoxLabel htmlFor={id}>
        <InfocCheckBoxSpan>{value}</InfocCheckBoxSpan>
      </InfoRadioBoxLabel>
    </>
  );
};

export default CareerRadioInput;

const InfoRadioBoxInput = styled.input`
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

const InfoRadioBoxLabel = styled.label`
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

const InfocCheckBoxSpan = styled.span``;
