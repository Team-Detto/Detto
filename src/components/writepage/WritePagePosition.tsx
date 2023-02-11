import React from 'react';
import { WriteType } from 'types/write/writeType';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';
interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChagneEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const WritePagePosition = ({
  writeFormValue,
  onFormValueChagneEvent,
}: Props) => {
  const {
    positions: { planner, designer, frontend, backend },
  } = writeFormValue;

  return (
    <WritePagePositionContainer>
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
        value={planner}
        onChageEvent={onFormValueChagneEvent}
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
        value={designer}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="프론트엔드"
        text="명"
        input={{
          id: 'frontend',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'frontend',
        }}
        value={frontend}
        onChageEvent={onFormValueChagneEvent}
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
        value={backend}
        onChageEvent={onFormValueChagneEvent}
      />
    </WritePagePositionContainer>
  );
};

const WritePagePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default WritePagePosition;
