import styled from '@emotion/styled';
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
    props.isActive === true ? '#5D50F0' : '#f2f4f6'};
  color: ${(props: { isActive: boolean }) =>
    props.isActive === true ? '#ffffff' : '#000000'};
  transition: transform 100ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;
