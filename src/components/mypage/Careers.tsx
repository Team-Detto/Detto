import styled from '@emotion/styled';
import { useCallback } from 'react';
import { career } from 'utils/positions';
import CareerRadioInput from './CareerRadioInput';

interface CareersProps {
  isJunior: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  handleButtonActive: () => void;
}

const Careers = ({
  isJunior,
  setUserInfo,
  handleButtonActive,
}: CareersProps) => {
  const handleCheckedRadioChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id } = e.currentTarget;

      setUserInfo((prevState) => {
        return {
          ...prevState,
          isJunior: id === 'junior' ? true : false,
        };
      });

      handleButtonActive();
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
