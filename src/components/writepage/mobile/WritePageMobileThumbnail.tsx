import {} from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: React.RefObject<HTMLInputElement>;
  thumbnail: string;
  onAddThumbnailImageChangeEvent: () => void;
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
          type="file"
          id="thumbnail"
          accept="image/jpg, image/png, image/jpeg"
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
        />
        <WritePageMobileThumbnailButton
          htmlFor="thumbnail"
          thumbnail={thumbnail}
        >
          <WritePageMobileThumbnailText>
            <MdOutlinePhotoCamera />
          </WritePageMobileThumbnailText>
        </WritePageMobileThumbnailButton>
      </WritePageMobileBodyRightBox>
    </WritePageMobileThumbnailContainer>
  );
};

const WritePageMobileThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const WritePageMobileThumbnailInput = styled.input`
  flex: 1;
  height: 2.75rem;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
  padding-top: 0.6rem;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
  color: ${COLORS.black};
  padding-left: 1rem;
  ::file-selector-button {
    display: none;
  }
`;
const WritePageMobileThumbnailButton = styled.label<{ thumbnail: string }>`
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
`;
const WritePageMobileThumbnailText = styled.p`
  color: ${COLORS.white};
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export default WritePageMobileThumbnail;
