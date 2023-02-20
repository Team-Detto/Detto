import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { positionList } from 'utils/positions';

const ApplyPositionButton = (props: any) => {
  const { clickValue, setClickValue } = props;

  const onClickEvent = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    setClickValue(idx);
  };

  return (
    <>
      {positionList.map((position: { name: string }, idx: number) => {
        return (
          <PositionButton
            key={position.name}
            onClick={(e) => onClickEvent(e, idx)}
            isActive={clickValue === idx}
          >
            {position.name}
          </PositionButton>
        );
      })}
    </>
  );
};

export default ApplyPositionButton;

const PositionButton = styled.button`
  width: 146px;
  height: 40px;
  border-radius: 16px;

  background-color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.violetB500}` : `${COLORS.gray100}`};
  color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? `${COLORS.white}` : `${COLORS.black}`};
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
