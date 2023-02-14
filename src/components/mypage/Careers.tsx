import styled from '@emotion/styled';
import { useCallback } from 'react';
import { career } from 'utils/positions';
import CareerRadioInput from './CareerRadioInput';

interface CareersProps {
  isJunior: boolean;
  setIsJuniorChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const Careers = ({ isJunior, setIsJuniorChecked }: CareersProps) => {
  const handleCheckedRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsJuniorChecked(e.target.value === 'isJunior' ? true : false);
    },
    [],
  );

  return (
    <CareerRadioBox>
      <CareerRadioInput
        juniorFlag={isJunior ? true : false}
        id={career[0].id}
        value={career[0].value}
        onChange={handleCheckedRadioChange}
      />
      <CareerRadioInput
        juniorFlag={isJunior ? false : true}
        id={career[1].id}
        value={career[1].value}
        onChange={handleCheckedRadioChange}
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
