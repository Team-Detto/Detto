import { RefObject } from 'react';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyRightBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: RefObject<HTMLInputElement>;
  editThumbnail: File | null;
  onAddThumbnailImageChangeEvent: () => void;
}

const EditPageMobileThumbnail = ({
  imageRef,
  editThumbnail,
  onAddThumbnailImageChangeEvent,
}: Props) => {
  return (
    <EditPageMobileThumbnailContainer>
      <EditPageMobileBodyLeftBox>
        <EditPageMobileBodyText>썸네일 추가</EditPageMobileBodyText>
      </EditPageMobileBodyLeftBox>
      <EditPageMobileBodyRightBox>
        <EditPageMobileThumbnailInput
          id="thumbnail"
          type="text"
          value={editThumbnail ? editThumbnail.name : '사진을 선택해 주세요'}
          disabled
        />
        <EditPageMobileThumbnailButton
          htmlFor="thumbnail"
          editThumbnail={editThumbnail}
          onClick={() => imageRef.current?.click()}
        >
          <EditPageMobileThumbnailText>
            <MdOutlinePhotoCamera />
          </EditPageMobileThumbnailText>
        </EditPageMobileThumbnailButton>
        <input
          id="file"
          type="file"
          style={{ display: 'none' }}
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
          accept="image/jpg, image/png, image/jpeg"
        />
      </EditPageMobileBodyRightBox>
    </EditPageMobileThumbnailContainer>
  );
};

const EditPageMobileThumbnailContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const EditPageMobileThumbnailInput = styled.input`
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

const EditPageMobileThumbnailButton = styled.label`
  cursor: pointer;
  gap: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { editThumbnail: File | null }) =>
    props.editThumbnail ? COLORS.gray300 : COLORS.violetB400};
  border-radius: 0.25rem;
  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;

const EditPageMobileThumbnailText = styled.p`
  color: ${COLORS.white};
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export default EditPageMobileThumbnail;
