import { ChangeEvent } from 'react';
import { WriteType } from 'types/write/writeType';
import { positionList } from 'utils/positions';
import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';
interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePagePosition = ({
  writeFormValue,
  onFormValueChangeEvent,
}: Props) => {
  const { positions }: any = writeFormValue;

  return (
    <WritePagePositionContainer>
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
    </WritePagePositionContainer>
  );
};

const WritePagePositionContainer = styled.div`
  width: 100%;
  display: flex;
`;

export default WritePagePosition;
