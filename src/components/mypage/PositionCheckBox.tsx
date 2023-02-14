import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import CheckBoxButton from './CheckboxButton';
import { positions } from 'utils/positions';
import { UserInfo } from './MyPageInfo';

interface PositionCheckBoxProps {
  userPositions: string[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const PositionCheckBox = ({
  userPositions,
  setUserInfo,
}: PositionCheckBoxProps) => {
  const handleCheckedPositionsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;

      if (checked) {
        setUserInfo((prevState) => {
          return {
            ...prevState,
            userPositions: [...prevState.userPositions, value],
          };
        });
      } else {
        // 체크 해제된 값 필터링하기
        setUserInfo((prevState) => {
          return {
            ...prevState,
            userPositions: prevState.userPositions.filter(
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
      {positions.map((position) => {
        const checkPosition = userPositions?.find(
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
