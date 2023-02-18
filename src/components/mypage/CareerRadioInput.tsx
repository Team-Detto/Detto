import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface CareerRadioInputProps {
  activeFlag: boolean;
  id: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const CareerRadioInput = ({
  activeFlag,
  id,
  value,
  onClick,
}: CareerRadioInputProps) => {
  return (
    <>
      {activeFlag ? (
        <InfoRadioBoxInput
          type="radio"
          id={id}
          name="isJunior"
          defaultValue={value}
          defaultChecked
          onClick={onClick}
        />
      ) : (
        <InfoRadioBoxInput
          type="radio"
          id={id}
          defaultValue={value}
          name="isJunior"
          onClick={onClick}
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
    background-color: ${COLORS.violetB500};
    color: ${COLORS.white};
  }
`;

const InfoRadioBoxLabel = styled.label`
  display: block;
  padding: 0.54rem 1.125rem;
  height: 2.25rem;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #f2f4f6;
  font-size: 0.75rem;
  color: #383838;
  transition: transform 300ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const InfocCheckBoxSpan = styled.span``;
