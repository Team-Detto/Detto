import { ChangeEvent } from 'react';
import { Position } from 'types/position/positionType';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';

interface Props {
  positions: Position.Developers;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EidtPagePosition = ({ positions, onFormValueChangeEvent }: Props) => {
  return (
    <PositionContainer>
      <LabelInput
        label="기획"
        text="명"
        input={{
          id: 'planner',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'planner',
        }}
        value={positions.planner || 0}
        onChangeEvent={onFormValueChangeEvent}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: 'designer',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'designer',
        }}
        value={positions.designer ? positions.designer : 0}
        onChangeEvent={onFormValueChangeEvent}
      />
      <LabelInput
        label="프론트"
        text="명"
        input={{
          id: 'frontend',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'frontend',
        }}
        value={positions.frontend || 0}
        onChangeEvent={onFormValueChangeEvent}
      />
      <LabelInput
        label="백엔드"
        text="명"
        input={{
          id: 'backend',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'backend',
        }}
        value={positions.backend || 0}
        onChangeEvent={onFormValueChangeEvent}
      />
    </PositionContainer>
  );
};

const PositionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default EidtPagePosition;
