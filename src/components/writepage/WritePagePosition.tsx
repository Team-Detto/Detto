import { ChangeEvent } from 'react';
import { positionList } from 'utils/positions';
import LabelInput from 'components/common/LabelInput';
import COLORS from 'assets/styles/colors';
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
    <>
      <WritePageBodyPositionBox>
        <WritePageBodyPositionText>필요 포지션</WritePageBodyPositionText>
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
      </WritePageBodyPositionBox>
      <WritePageBodyPositionWarning>
        인원수는 각 포지션별 최대 99명까지 가능합니다.
      </WritePageBodyPositionWarning>
    </>
  );
};

const WritePageBodyPositionBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
`;
const WritePageBodyPositionText = styled.label`
  width: 26.8%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const WritePageBodyPositionWarning = styled.p`
  padding-left: 7.3rem;
  width: 23rem;
  margin-top: 0.3rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray600};
`;

export default WritePagePosition;
