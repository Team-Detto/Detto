import React from 'react';
import { WriteFormValueType } from 'pages/ProjectWritePage';
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
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'plannerPosition',
        }}
        value={writeFormValue.plannerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="개발"
        text="명"
        input={{
          id: '1',
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'developerPosition',
        }}
        value={writeFormValue.developerPosition}
        onChageEvent={onFormValueChagneEvent}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: '1',
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'designerPosition',
        }}
        value={writeFormValue.designerPosition}
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
