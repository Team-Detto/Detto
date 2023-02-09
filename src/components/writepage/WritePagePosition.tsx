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
  return (
    <WritePagePositionContainer>
      <LabelInput
        label="기획"
        text="명"
        input={{
          id: '1',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'plannerPosition',
        }}
        value={writeFormValue.plannerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: '1',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'designerPosition',
        }}
        value={writeFormValue.designerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="프론트엔드"
        text="명"
        input={{
          id: '1',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'frontendPosition',
        }}
        value={writeFormValue.frontendPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="백엔드"
        text="명"
        input={{
          id: '1',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'backendPosition',
        }}
        value={writeFormValue.backendPosition}
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
