import { RefObject } from 'react';
import { WriteType } from 'types/write/writeType';
import WritePageStack from './WritePageStack';
import WritePagePosition from './WritePagePosition';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  setWriteFormValue: (value: WriteType.WriteFormType) => void;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
  onAddThumbnailImageEvent: () => void;
}

const ProjectWritePageBody = ({
  imageRef,
  writeFormValue,
  setWriteFormValue,
  onFormValueChangeEvent,
  onAddThumbnailImageEvent,
}: Props) => {
  const handleAddThumbnailImageChange = () => {
    setWriteFormValue({
      ...writeFormValue,
      thumbnail: imageRef.current?.files?.length
        ? imageRef.current.files[0]
        : '',
    });
  };

  return (
    <WritePageBodyContainer>
      <WritePageBodyPositionBox>
        <WritePageBodyText>필요 포지션</WritePageBodyText>
        <WritePagePosition
          writeFormValue={writeFormValue}
          onFormValueChangeEvent={onFormValueChangeEvent}
        />
      </WritePageBodyPositionBox>
      <WritePageBodyStackBox>
        <WritePageStack
          writeFormValue={writeFormValue}
          setWriteFormValue={setWriteFormValue}
        />
      </WritePageBodyStackBox>
      <WritePageBodyEstimatedPeriodBox>
        <WritePageBodyText>예상 기간</WritePageBodyText>
        <WritePageBodyDateInput
          type="date"
          name="startDate"
          value={writeFormValue.startDate}
          onChange={onFormValueChangeEvent}
        />
        <WritePageBodyDateInput
          type="date"
          name="endDate"
          value={writeFormValue.endDate}
          onChange={onFormValueChangeEvent}
        />
      </WritePageBodyEstimatedPeriodBox>
      <WritePageBodyDeadlineBox>
        <WritePageBodyText>모집 마감일</WritePageBodyText>
        <WritePageBodyDateInput
          type="date"
          name="deadline"
          value={writeFormValue.deadline}
          onChange={onFormValueChangeEvent}
        />
      </WritePageBodyDeadlineBox>
      <WritePageBodyThumbnailBox>
        <WritePageBodyText>썸네일 추가</WritePageBodyText>
        <WritePageBodyThumbnailImage
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          ref={imageRef}
          onChange={handleAddThumbnailImageChange}
        />
        <WritePageBodyThumbnailButton
          onClick={onAddThumbnailImageEvent}
          writeFormValue={writeFormValue}
        >
          사진 추가하기
        </WritePageBodyThumbnailButton>
      </WritePageBodyThumbnailBox>
      <WritePageBodyThumbnailWarningText>
        권장 이미지 사이즈는 1200x600 입니다.
      </WritePageBodyThumbnailWarningText>
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
const WritePageBodyEstimatedPeriodBox = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding-right: 25rem;
  display: flex;
  flex-direction: row;
`;
const WritePageBodyDateInput = styled.input`
  width: 9.5625rem;
  height: 2.75rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  background: ${COLORS.white};
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
  padding-right: 0.5rem;
`;
const WritePageBodyThumbnailImage = styled.input`
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
const WritePageBodyThumbnailButton = styled.button`
  padding: 0.625rem 1.75rem;
  width: 226px;
  height: 43px;
  background: ${(props: { writeFormValue: WriteType.WriteFormType }) =>
    props.writeFormValue.thumbnail ? COLORS.gray300 : COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 8px;
  margin-left: 2rem;
  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB400};
  }
`;
const WritePageBodyThumbnailWarningText = styled.p`
  padding-left: 7rem;
  margin-top: 0.5rem;
  width: 20rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray600};
`;

export default ProjectWritePageBody;
