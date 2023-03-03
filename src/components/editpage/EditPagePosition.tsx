import { ChangeEvent } from 'react';
import { Position } from 'types/position/positionType';
import { positionList } from 'utils/positions';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';

interface Props {
  positions: any;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EidtPagePosition = ({ positions, onFormValueChangeEvent }: Props) => {
  return (
    <BodyPositionBox>
      <BodyPositionText>필요 포지션</BodyPositionText>
      {positionList.map(({ type, name }) => (
        <LabelInput
          key={type}
          label={name}
          text="명"
          input={{
            id: type,
            type: 'number',
            width: '7.5rem',
            height: '2.8125rem',
            name: type,
            placeholder: '0',
          }}
          value={positions[type]}
          onChangeEvent={onFormValueChangeEvent}
        />
      ))}
    </BodyPositionBox>
  );
};

const BodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;

const BodyPositionText = styled.label`
  width: 26.8%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;

export default EidtPagePosition;
