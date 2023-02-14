import styled from '@emotion/styled';
import { useState } from 'react';

const ApplyPositionButton = ({ name, idx }: { name: string; idx: number }) => {
  const [isActive, setIsActive] = useState(false);
  const onClickEvent = () => {
    setIsActive(false);
    setIsActive(!isActive);
  };
  return (
    <PositionButton onClick={onClickEvent} key={idx} isActive={isActive}>
      {name}
    </PositionButton>
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
`;
