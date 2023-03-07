import { ChangeEvent, MouseEvent, RefObject } from 'react';
import EditPageMobilePosition from './EditPageMobilePosition';
import EditPageMobileStack from './EditPageMobileStack';
import EditPageMobilePeriod from './EditPageMobilePeriod';
import EditPageMobileDeadline from './EditPageMobileDeadline';
import EditPageMobileThumbnail from './EditPageMobileThumbnail';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { EditType } from 'types/write/writeType';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  editFormValue: EditType.EditFormType;
  setEditFormValue: (value: any) => void;
  onCalculateEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const EditPageMobileBody = ({
  imageRef,
  editFormValue,
  setEditFormValue,
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
  } = editFormValue;
  return (
    <EditPageMobileBodyContainer>
      <EditPageMobilePosition
        positions={positions}
        onCalculateEvent={onCalculateEvent}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageMobileStack
        plannerStack={plannerStack}
        designerStack={designerStack}
        developerStack={developerStack}
        setEditFormValue={setEditFormValue}
      />
      <EditPageMobilePeriod
        startDate={startDate}
        endDate={endDate}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageMobileDeadline
        deadline={deadline}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageMobileThumbnail
        imageRef={imageRef}
        thumbnail={thumbnail}
        onAddThumbnailImageChangeEvent={onAddThumbnailImageChangeEvent}
      />
    </EditPageMobileBodyContainer>
  );
};

const EditPageMobileBodyContainer = styled.div`
  width: 100%;
  margin-top: 1.3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const EditPageMobileBodyLeftBox = styled.div`
  width: 4.5625rem;
  display: flex;
  margin-top: 0.7rem;
`;

export const EditPageMobileBodyRightBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const EditPageMobileBodyText = styled.p`
  width: 3.625rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray800};
`;

export default EditPageMobileBody;
