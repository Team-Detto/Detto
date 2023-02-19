import { ChangeEvent } from 'react';
import { EditType } from 'types/write/writeType';
import EidtPagePosition from './EditPagePosition';
import EditPageStack from './EditPageStack';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: any;
  editFormValue: EditType.EditFormType;
  setEditFormValue: (value: EditType.EditFormType) => void;
  setEditThumbnail: (value: any) => void;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddThumbnailImageEvent: () => void;
}
const ProjectEditPageBody = ({
  imageRef,
  editFormValue,
  setEditFormValue,
  setEditThumbnail,
  onFormValueChangeEvent,
  onAddThumbnailImageEvent,
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
  const handleAddThumbnailImageChange = () => {
    setEditThumbnail(
      imageRef.current?.files?.length ? imageRef.current.files[0] : '',
    );
  };

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
          setEditFormValue={setEditFormValue}
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
      <BodyThumbnailBox>
        <BodyText>썸네일 추가</BodyText>
        <BodyThumbnailImage
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          ref={imageRef}
          onChange={handleAddThumbnailImageChange}
        />
        <BodyThumbnailButton
          onClick={onAddThumbnailImageEvent}
          imageRef={imageRef}
        >
          사진 추가하기
        </BodyThumbnailButton>
      </BodyThumbnailBox>
      <BodyThumbnailWarningText>
        권장 이미지 사이즈는 1200x600 입니다.
      </BodyThumbnailWarningText>
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
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  background: ${COLORS.white};
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
const BodyThumbnailBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  padding-right: 0.5rem;
`;
const BodyThumbnailImage = styled.input`
  padding: 10px 20px;
  width: 62.625rem;
  height: 44px;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  ::file-selector-button {
    display: none;
  }
`;
const BodyThumbnailButton = styled.button`
  padding: 0.625rem 1.75rem;
  width: 226px;
  height: 43px;
  background: ${(props: { imageRef: any }) =>
    props.imageRef.current?.files?.length ? COLORS.gray300 : COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 8px;
  margin-left: 2rem;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB400};
  }
`;
const BodyThumbnailWarningText = styled.p`
  padding-left: 7rem;
  margin-top: 0.5rem;
  width: 20rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray600};
`;

export default ProjectEditPageBody;
