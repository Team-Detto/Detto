import { RefObject } from 'react';
import { BodyText } from './ProjectEditPageBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  onAddThumbnailImageEvent: () => void;
  onAddThumbnailImageChangeEvent: () => void;
}

const EditPageThumbnail = ({
  imageRef,
  onAddThumbnailImageEvent,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  return (
    <>
      <BodyThumbnailBox>
        <BodyText>썸네일 추가</BodyText>
        <BodyThumbnailImage
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
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
    </>
  );
};

const BodyThumbnailBox = styled.div`
  width: 100%;
  margin-top: 2.5rem;
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
    background-color: ${COLORS.violetB300};
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

export default EditPageThumbnail;
