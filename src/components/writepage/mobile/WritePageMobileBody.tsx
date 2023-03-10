import { ChangeEvent, MouseEvent, RefObject } from 'react';
import WritePageMobilePosition from './WritePageMobilePosition';
import WritePageMobileStack from './WritePageMobileStack';
import WritePageMobilePeriod from './WritePageMobilePeriod';
import WritePageMobileDeadline from './WritePageMobileDeadline';
import WritePageMobileThumbnail from './WritePageMobileThumbnail';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  setWriteFormValue: (value: WriteType.WriteFormType) => void;
  onCalculateEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const WritePageMobileBody = ({
  imageRef,
  writeFormValue,
  setWriteFormValue,
  onCalculateEvent,
  onFormValueChangeEvent,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  const {
    positions,
    plannerStack,
    designerStack,
    developerStack,
    startDate,
    endDate,
    deadline,
    thumbnail,
  } = writeFormValue;
  return (
    <WritePageMobileBodyContainer>
      <WritePageMobilePosition
        positions={positions}
        onCalculateEvent={onCalculateEvent}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageMobileStack
        plannerStack={plannerStack}
        designerStack={designerStack}
        developerStack={developerStack}
        setWriteFormValue={setWriteFormValue}
      />
      <WritePageMobilePeriod
        startDate={startDate}
        endDate={endDate}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageMobileDeadline
        deadline={deadline}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <WritePageMobileThumbnail
        imageRef={imageRef}
        thumbnail={thumbnail}
        onAddThumbnailImageChangeEvent={onAddThumbnailImageChangeEvent}
      />
    </WritePageMobileBodyContainer>
  );
};

const WritePageMobileBodyContainer = styled.div`
  width: 100%;
  margin-top: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const WritePageMobileBodyLeftBox = styled.div`
  width: 4.5625rem;
  display: flex;
  margin-top: 0.7rem;
`;

export const WritePageMobileBodyRightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const WritePageMobileBodyText = styled.p`
  width: 3.625rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray800};
`;

export default WritePageMobileBody;
