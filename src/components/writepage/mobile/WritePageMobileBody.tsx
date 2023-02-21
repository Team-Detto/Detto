import { ChangeEvent, RefObject } from 'react';
import { WriteType } from 'types/write/writeType';
import WritePageMobilePosition from './WritePageMobilePosition';
import WritePageMobileStack from './WritePageMobileStack';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import WritePageMobilePeriod from './WritePageMobilePeriod';
import WritePageMobileDeadline from './WritePageMobileDeadline';
import WritePageMobileThumbnail from './WritePageMobileThumbnail';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  setWriteFormValue: (value: WriteType.WriteFormType) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const WritePageMobileBody = ({
  imageRef,
  writeFormValue,
  setWriteFormValue,
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
      <WritePageMobilePosition positions={positions} />
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
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const WritePageMobileBodyLeftBox = styled.div`
  width: 22%;
  display: flex;
  margin: 0.7rem 0rem 0rem 0.7rem;
`;
export const WritePageMobileBodyRightBox = styled.div`
  width: 75%;
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
