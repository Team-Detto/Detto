import React from 'react';
import { WriteFormValueType } from 'hooks/useWrite';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';
interface Props {
  writeFormValue: WriteFormValueType;
  onFormValueChagneEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const WritePagePosition = ({
  writeFormValue,
  onFormValueChagneEvent,
}: Props) => {
  const {
    positions: {
      plannerPosition,
      designerPosition,
      frontendPosition,
      backendPosition,
    },
  } = writeFormValue;

  return (
    <WritePagePositionContainer>
      <LabelInput
        label="기획"
        text="명"
        input={{
          id: 'plannerPosition',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
        }}
        value={plannerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: 'designerPosition',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
        }}
        value={designerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="프론트엔드"
        text="명"
        input={{
          id: 'frontendPosition',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
        }}
        value={frontendPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="백엔드"
        text="명"
        input={{
          id: 'backendPosition',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
        }}
        value={backendPosition}
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
