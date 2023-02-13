import styled from '@emotion/styled';
import { career } from 'utils/positions';
import CareerRadioInput from './CareerRadioInput';

interface CareersProps {
  isJunior: boolean;
}

const Careers = ({ isJunior }: CareersProps) => {
  console.log('isJunior', isJunior);
  return (
    <CareerRadioBox>
      <CareerRadioInput
        juniorFlag={isJunior ? true : false}
        id={career[0].id}
        value={career[0].value}
      />
      <CareerRadioInput
        juniorFlag={isJunior ? false : true}
        id={career[1].id}
        value={career[1].value}
      />
    </CareerRadioBox>
  );
};

export default Careers;

const CareerRadioBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
