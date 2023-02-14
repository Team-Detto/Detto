import { ChangeEvent } from 'react';
import EidtPagePosition from './EditPagePosition';
import EditPageStack from './EditPageStack';
import styled from '@emotion/styled';

interface Props {
  imageRef: any;
  editFormValue: any;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddSumnailImageEvent: () => void;
}

const ProjectEditPageBody = ({
  imageRef,
  editFormValue,
  onFormValueChangeEvent,
  onAddSumnailImageEvent,
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
    <BodyContainer>
      <BodyPositionBox>
        <BodyText>필요 포지션</BodyText>
        <EidtPagePosition
          positions={positions}
          onFormValueChangeEvent={onFormValueChangeEvent}
        />
      </BodyPositionBox>
      <BodyStackBox>
        <EditPageStack
          plannerStack={plannerStack}
          designerStack={designerStack}
          developerStack={developerStack}
        />
      </BodyStackBox>
      <BodyEstimatedPeriodBox>
        <BodyText>예상 기간</BodyText>
        <BodyDateInput
          type="date"
          name="startDate"
          value={new Date(+new Date(startDate)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
        <BodyDateInput
          type="date"
          name="endDate"
          value={new Date(+new Date(endDate)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
      </BodyEstimatedPeriodBox>
      <BodyDeadlineBox>
        <BodyText>모집 마감일</BodyText>
        <BodyDateInput
          type="date"
          name="deadline"
          value={new Date(+new Date(deadline)).toISOString().split('T')[0]}
          onChange={onFormValueChangeEvent}
        />
      </BodyDeadlineBox>
      <BodySumnailBox>
        <BodyText>썸네일 추가</BodyText>
        <BodySumnailImage type="file" accept="image/*" ref={imageRef} />
        <BodySumnailButton onClick={onAddSumnailImageEvent}>
          사진 추가하기
        </BodySumnailButton>
      </BodySumnailBox>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  width: 100%;
`;
const BodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;
const BodyText = styled.h2`
  width: 10.5%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const BodyStackBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const BodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const BodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
const BodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const BodySumnailBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  padding-right: 7rem;
`;
const BodySumnailImage = styled.input`
  padding: 10px 20px;
  width: 808px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #ced3db;
  border-radius: 4px;
  ::file-selector-button {
    display: none;
  }
`;
const BodySumnailButton = styled.button`
  padding: 0.625rem 1.75rem;
  width: 226px;
  height: 43px;
  background: #ced3db;
  color: #ffffff;
  border-radius: 8px;
  margin-left: 2rem;
`;

export default ProjectEditPageBody;
