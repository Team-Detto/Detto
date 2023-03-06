import { ChangeEvent, RefObject } from 'react';
import { EditType } from 'types/write/writeType';
import EditPagePosition from './EditPagePosition';
import EditPageStack from './EditPageStack';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import EditPagePeriod from './EditPagePeriod';
import EditPageDeadline from './EditPageDeadline';
import EditPageThumbnail from './EditPageThumbnail';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  editFormValue: EditType.EditFormType;
  setEditFormValue: (value: EditType.EditFormType) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageEvent: () => void;
  onAddThumbnailImageChangeEvent: () => void;
}
const ProjectEditPageBody = ({
  imageRef,
  editFormValue,
  setEditFormValue,
  onFormValueChangeEvent,
  onAddThumbnailImageEvent,
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
    isRecruiting,
  } = editFormValue;
  return (
    <BodyContainer>
      <EditPagePosition
        positions={positions}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageStack
        plannerStack={plannerStack}
        designerStack={designerStack}
        developerStack={developerStack}
        setEditFormValue={setEditFormValue}
      />
      <EditPagePeriod
        startDate={startDate}
        endDate={endDate}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageDeadline
        isRecruiting={isRecruiting}
        deadline={deadline}
        onFormValueChangeEvent={onFormValueChangeEvent}
      />
      <EditPageThumbnail
        imageRef={imageRef}
        onAddThumbnailImageEvent={onAddThumbnailImageEvent}
        onAddThumbnailImageChangeEvent={onAddThumbnailImageChangeEvent}
      />
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
`;

export const BodyText = styled.h2`
  width: 10.5%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;

export const BodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  background: ${COLORS.white};
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
export default ProjectEditPageBody;
