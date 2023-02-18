import { useCallback } from 'react';
import styled from '@emotion/styled';
import CheckBoxButton from './CheckboxButton';
import { positionList } from 'utils/positions';
import { mypageInfoButtonActiveState } from '../../recoil/atoms';
import { useSetRecoilState } from 'recoil';

interface PositionCheckBoxProps {
  positions: string[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const PositionCheckBox = ({
  positions,
  setUserInfo,
}: PositionCheckBoxProps) => {
  const setActiveInfoBtn = useSetRecoilState(mypageInfoButtonActiveState);

  const handleCheckedPositionsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setActiveInfoBtn(true);
      const { value, checked } = e.target;

      if (checked) {
        setUserInfo((prevState) => {
          return {
            ...prevState,
            positions: [...prevState.positions, value],
          };
        });
      } else {
        // 체크 해제된 값 필터링하기
        setUserInfo((prevState) => {
          return {
            ...prevState,
            positions: prevState.positions.filter(
              (position) => position !== value,
            ),
          };
        });
      }
    },
    [],
  );

  return (
    <ButtonsWrapper type={'info'}>
      {positionList.map((position) => {
        const checkPosition = positions?.find(
          (userPosition) => userPosition === position.type,
        );

        return checkPosition ? (
          <CheckBoxButton
            key={position.type}
            type={position.type}
            name={position.name}
            isChecked={true}
            onChange={handleCheckedPositionsChange}
          />
        ) : (
          <CheckBoxButton
            key={position.type}
            type={position.type}
            name={position.name}
            onChange={handleCheckedPositionsChange}
          />
        );
      })}
    </ButtonsWrapper>
  );
};

export default PositionCheckBox;

export const ButtonsWrapper = styled.div<{ type?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ type }) => (type === 'info' ? '0' : '1.5625rem')};
`;
