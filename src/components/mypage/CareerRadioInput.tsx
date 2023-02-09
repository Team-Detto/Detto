import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { career } from 'utils/positions';

const CareerRadioInput = () => {
  return (
    <>
      {career.map((career) => (
        <CareerRadioBox key={career.id}>
          <InfoRadioBoxInput type="radio" id={career.id} name="isJunior" />
          <InfoRadioBoxLabel htmlFor={career.id}>
            <InfocCheckBoxSpan>{career.value}</InfocCheckBoxSpan>
          </InfoRadioBoxLabel>
        </CareerRadioBox>
      ))}
    </>
  );
};

export default CareerRadioInput;

const CareerRadioBox = styled.div`
  margin-right: 0.75rem;

  &:last-child {
    margin-right: 0;
  }
`;

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
  padding: 0.5rem 1rem;
  height: 2.25rem;
  cursor: pointer;
  border-radius: 2rem;
  background-color: #f2f4f6;
  font-size: 0.75rem;
  color: #383838;
`;

const InfocCheckBoxSpan = styled.span``;
