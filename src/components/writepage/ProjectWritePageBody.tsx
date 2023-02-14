import { RefObject } from 'react';
import { WriteType } from 'types/write/writeType';
import WritePageStack from './WritePageStack';
import WritePagePosition from './WritePagePosition';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  onFormValueChagneEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  onAddThumbnailImageEvent: () => void;
}

const ProjectWritePageBody = ({
  imageRef,
  writeFormValue,
  onFormValueChagneEvent,
  onAddThumbnailImageEvent: onAddThumbnailImageEvent,
}: Props) => {
  return (
    <WritePageBodyContainer>
      <WritePageBodyPositionBox>
        <WritePageBodyText>필요 포지션</WritePageBodyText>
        <WritePagePosition
          writeFormValue={writeFormValue}
          onFormValueChagneEvent={onFormValueChagneEvent}
        />
      </WritePageBodyPositionBox>
      <WritePageBodyStackBox>
        <WritePageStack writeFormValue={writeFormValue} />
      </WritePageBodyStackBox>
      <WirtePageBodyEstimatedPeriodBox>
        <WritePageBodyText>예상 기간</WritePageBodyText>
        <WritePageBodyDateInput
          type="date"
          name="startDate"
          value={writeFormValue.startDate}
          onChange={onFormValueChagneEvent}
        />
        <WritePageBodyDateInput
          type="date"
          name="endDate"
          value={writeFormValue.endDate}
          onChange={onFormValueChagneEvent}
        />
      </WirtePageBodyEstimatedPeriodBox>
      <WritePageBodyDeadlineBox>
        <WritePageBodyText>모집 마감일</WritePageBodyText>
        <WritePageBodyDateInput
          type="date"
          name="deadline"
          value={writeFormValue.deadline}
          onChange={onFormValueChagneEvent}
        />
      </WritePageBodyDeadlineBox>
      <WritePageBodyThumbnailBox>
        <WritePageBodyText>썸네일 추가</WritePageBodyText>
        <WritePageBodyThumbnailImage
          type="file"
          accept="image/*"
          ref={imageRef}
        />
        <WritePageBodyThumbnailButton onClick={onAddThumbnailImageEvent}>
          사진 추가하기
        </WritePageBodyThumbnailButton>
      </WritePageBodyThumbnailBox>
    </WritePageBodyContainer>
  );
};

const WritePageBodyContainer = styled.div`
  width: 100%;
`;
const WritePageBodyPositionBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;
const WritePageBodyText = styled.h2`
  width: 10.5%;
  display: flex;
  align-items: center;
  font-weight: 400;
  line-height: 1.75rem;
  letter-spacing: -0.02rem;
  color: #383838;
`;
const WritePageBodyStackBox = styled.div`
  width: 100%;
  margin-top: 2rem;
`;
const WirtePageBodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const WritePageBodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  margin-left: 1.5rem;
  padding-left: 1rem;
`;
const WritePageBodyDeadlineBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const WritePageBodyThumbnailBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  padding-right: 7rem;
`;
const WritePageBodyThumbnailImage = styled.input`
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
const WritePageBodyThumbnailButton = styled.button`
  padding: 0.625rem 1.75rem;
  width: 226px;
  height: 43px;
  background: #ced3db;
  color: #ffffff;
  border-radius: 8px;
  margin-left: 2rem;
`;

export default ProjectWritePageBody;
