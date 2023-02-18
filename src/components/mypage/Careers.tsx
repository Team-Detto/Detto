import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState, userInfoState } from '../../recoil/atoms';
import styled from '@emotion/styled';
import { career } from 'utils/positions';
import CareerRadioInput from './CareerRadioInput';

interface CareersProps {
  isJunior: boolean;
}

const Careers = ({ isJunior }: CareersProps) => {
  const setActiveInfoBtn = useSetRecoilState(mypageInfoButtonActiveState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const handleCheckedRadioChange = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      const { id } = e.currentTarget;

      setUserInfo((prevState) => {
        return {
          ...prevState,
          isJunior: id === 'junior' ? true : false,
        };
      });

      setActiveInfoBtn(true);
    },
    [],
  );

  return (
    <CareerRadioBox>
      <CareerRadioInput
        activeFlag={isJunior ? true : false}
        id={career[0].id}
        value={career[0].value}
        onClick={handleCheckedRadioChange}
      />
      <CareerRadioInput
        activeFlag={isJunior ? false : true}
        id={career[1].id}
        value={career[1].value}
        onClick={handleCheckedRadioChange}
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
