import { RefObject } from 'react';
import EditPageMobilePosition from './EditPageMobilePosition';
import EditPageMobileStack from './EditPageMobileStack';
import EditPageMobilePeriod from './EditPageMobilePeriod';
import EditPageMobileDeadline from './EditPageMobileDeadline';
import EditPageMobileThumbnail from './EditPageMobileThumbnail';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  editThumbnail: any;
  editFormValue: any;
  setEditFormValue: (value: any) => void;
  onFormValueChangeEvent: (e: any) => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const EditPageMobileBody = ({
  imageRef,
  editThumbnail,
  editFormValue,
  setEditFormValue,
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
  } = editFormValue;

  return (
    <EditPageMobileBodyContainer>
      <EditPageMobilePosition positions={positions} />
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
        editThumbnail={editThumbnail}
        onAddThumbnailImageChangeEvent={onAddThumbnailImageChangeEvent}
      />
    </EditPageMobileBodyContainer>
  );
};

const EditPageMobileBodyContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const EditPageMobileBodyLeftBox = styled.div`
  width: 22%;
  display: flex;
  margin: 0.7rem 0rem 0rem 0.7rem;
`;
export const EditPageMobileBodyRightBox = styled.div`
  width: 75%;
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
