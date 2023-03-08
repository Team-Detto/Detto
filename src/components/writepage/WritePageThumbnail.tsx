import { RefObject } from 'react';
import { WritePageBodyText } from './ProjectWritePageBody';
import { WriteType } from 'types/write/writeType';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  writeFormValue: WriteType.WriteFormType;
  onAddThumbnailImageEvent: () => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const WritePageThumbnail = ({
  imageRef,
  writeFormValue,
  onAddThumbnailImageEvent,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  return (
    <>
      <WritePageBodyThumbnailBox>
        <WritePageBodyText htmlFor="thumbnail">썸네일 추가</WritePageBodyText>
        <WritePageBodyThumbnailImage
          id="thumbnail"
          type="text"
          value={
            writeFormValue.thumbnail
              ? writeFormValue.thumbnail.name
              : '사진을 선택해 주세요'
          }
          disabled
        />
        <WritePageBodyThumbnailButton
          onClick={onAddThumbnailImageEvent}
          writeFormValue={writeFormValue}
        >
          사진 추가하기
        </WritePageBodyThumbnailButton>
        <input
          id="file"
          type="file"
          style={{ display: 'none' }}
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
          accept="image/jpg, image/png, image/jpeg"
        />
      </WritePageBodyThumbnailBox>
      <WritePageBodyThumbnailWarningText>
        권장 이미지 사이즈는 1200x600 입니다.
      </WritePageBodyThumbnailWarningText>
    </>
  );
};

const WritePageBodyThumbnailBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
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
    background-color: ${COLORS.violetB300};
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

export default WritePageThumbnail;
