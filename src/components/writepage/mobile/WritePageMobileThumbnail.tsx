import {} from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import {
  WritePageMobileBodyLeftBox,
  WritePageMobileBodyRightBox,
  WritePageMobileBodyText,
} from './WritePageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobileThumbnail = () => {
  return (
    <WritePageMobileThumbnailContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>썸네일 추가</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileThumbnailInput id="thumbnail" type="file" />
        <WritePageMobileThumbnailButton htmlFor="thumbnail">
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
  width: 14.5rem;
  height: 2.75rem;
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
  padding-top: 0.6rem;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 140%;
  color: ${COLORS.gray200};

  padding-left: 1rem;

  ::file-selector-button {
    display: none;
  }
`;
const WritePageMobileThumbnailButton = styled.label`
  cursor: pointer;
  padding: 0.625rem;
  gap: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.violetB500};
  border-radius: 0.25rem;
  margin-right: 0.8rem;
`;
const WritePageMobileThumbnailText = styled.p`
  color: ${COLORS.white};
  font-size: 1.5rem;
`;

export default WritePageMobileThumbnail;
