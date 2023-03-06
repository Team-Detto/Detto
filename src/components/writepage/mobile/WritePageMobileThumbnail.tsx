import { ChangeEvent, RefObject } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  thumbnail: File | null;
  onAddThumbnailImageChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const WritePageMobileThumbnail = ({
  imageRef,
  thumbnail,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  return (
    <WritePageMobileThumbnailContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>썸네일 추가</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileThumbnailInput
          id="thumbnail"
          type="text"
          value={thumbnail ? thumbnail.name : '사진을 선택해 주세요'}
          onChange={onAddThumbnailImageChangeEvent}
          disabled
        />
        <WritePageMobileThumbnailButton
          htmlFor="thumbnail"
          thumbnail={thumbnail}
          onClick={() => imageRef.current?.click()}
        >
          <WritePageMobileThumbnailText>
            <MdOutlinePhotoCamera />
          </WritePageMobileThumbnailText>
        </WritePageMobileThumbnailButton>
        <input
          id="file"
          type="file"
          style={{ display: 'none' }}
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
          accept="image/jpg, image/png, image/jpeg"
        />
      </WritePageMobileBodyRightBox>
    </WritePageMobileThumbnailContainer>
  );
};

const WritePageMobileThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const WritePageMobileThumbnailInput = styled.input`
  min-width: 13.35rem;
  height: 2.75rem;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
  color: ${COLORS.black};
  padding-left: 1rem;
  :disabled {
    color: ${COLORS.black};
  }
`;
const WritePageMobileThumbnailButton = styled.label<{ thumbnail: File | null }>`
  cursor: pointer;
  gap: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ thumbnail }) =>
    thumbnail ? COLORS.gray300 : COLORS.violetB500};
  border-radius: 0.25rem;
  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
const WritePageMobileThumbnailText = styled.p`
  color: ${COLORS.white};
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export default WritePageMobileThumbnail;
