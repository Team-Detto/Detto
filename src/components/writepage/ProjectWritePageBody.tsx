import { ChangeEvent, RefObject } from 'react';
import { WriteType } from 'types/write/writeType';
import WritePageStack from './WritePageStack';
import WritePagePosition from './WritePagePosition';
import WritePagePeriod from './WritePagePeriod';
import WritePageDeadline from './WritePageDeadline';
import WritePageThumbnail from './WritePageThumbnail';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  setWriteFormValue: (value: WriteType.WriteFormType) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageEvent: () => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const ProjectWritePageBody = ({
  imageRef,
  writeFormValue,
  setWriteFormValue,
  onFormValueChangeEvent,
  onAddThumbnailImageEvent,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  return (
    <WritePageBodyContainer>
      <WritePagePosition
        writeFormValue={writeFormValue}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageStack
        writeFormValue={writeFormValue}
        setWriteFormValue={setWriteFormValue}
      />
      <WritePagePeriod
        writeFormValue={writeFormValue}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageDeadline
        writeFormValue={writeFormValue}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageThumbnail
        imageRef={imageRef}
        writeFormValue={writeFormValue}
        onAddThumbnailImageEvent={onAddThumbnailImageEvent}
        onAddThumbnailImageChangeEvent={onAddThumbnailImageChangeEvent}
      />
    </WritePageBodyContainer>
  );
};

const WritePageBodyContainer = styled.div`
  width: 100%;
`;
export const WritePageBodyText = styled.label`
  width: 10.5%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
export const WritePageBodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  background: ${COLORS.white};
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
export default ProjectWritePageBody;
