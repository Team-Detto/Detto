import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useEffect, useState } from 'react';

import { positionList, positionType } from 'utils/positions';

const ApplyPositionButton = (props: any) => {
  const { clickValue, setClickValue, version, positions } = props;
  // console.log(positions);
  const [disabled, setDisabled] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ]);
  const onClickEvent = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    setClickValue(idx);
  };

  useEffect(() => {
    let tmp = [...disabled];
    positionType.map((type, idx) =>
      positions[type] === 0
        ? (tmp[idx] = true) && setDisabled(tmp)
        : setDisabled(tmp),
    );
  }, []);
  console.log(disabled);

  return (
    <>
      {positionList.map(
        (position: { type: string; name: string }, idx: number) => {
          return (
            <PositionButton
              key={position.name}
              onClick={(e) => onClickEvent(e, idx)}
              isActive={clickValue === idx}
              version={version}
              disabled={disabled[idx]}
            >
              {position.name}
            </PositionButton>
          );
        },
      )}
    </>
  );
};

export default ApplyPositionButton;
const PositionButton = styled.button<{
  isActive: boolean;
  version: string;
  disabled: boolean;
}>`
  width: ${({ version }) => (version === 'mobile' ? '67px' : '146px')};
  height: ${({ version }) => (version === 'mobile' ? '42px' : '40px')};
  border-radius: 16px;
  font-size: ${({ version }) => (version === 'mobile' ? '12px' : '18px')};

  background-color: ${({ isActive }) =>
    isActive ? `${COLORS.violetB500}` : `${COLORS.gray100}`};
  color: ${({ isActive, disabled }) =>
    isActive
      ? `${COLORS.white}`
      : disabled
      ? `${COLORS.gray200}`
      : `${COLORS.black}`};
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.05)')};
  }
`;
