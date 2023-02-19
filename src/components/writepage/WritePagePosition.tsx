import React from 'react';
import { WriteType } from 'types/write/writeType';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';
interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const WritePagePosition = ({
  writeFormValue,
  onFormValueChangeEvent,
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
        onChageEvent={onFormValueChangeEvent}
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
        onChageEvent={onFormValueChangeEvent}
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
        value={frontend}
        onChageEvent={onFormValueChangeEvent}
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
        onChageEvent={onFormValueChangeEvent}
      />
    </WritePagePositionContainer>
  );
};

const WritePagePositionContainer = styled.div`
  width: 100%;
  display: flex;
`;

export default WritePagePosition;
