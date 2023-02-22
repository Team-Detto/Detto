import { MdOutlinePhotoCamera } from 'react-icons/md';
import {
  EditPageMobileBodyLeftBox,
  EditPageMobileBodyRightBox,
  EditPageMobileBodyText,
} from './EditPageMobileBody';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  imageRef: any;
  editThumbnail: any;
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
          type="file"
          id="thumbnail"
          accept="image/jpg, image/png, image/jpeg"
          ref={imageRef}
          onChange={onAddThumbnailImageChangeEvent}
        />

        <EditPageMobileThumbnailButton
          htmlFor="thumbnail"
          editThumbnail={editThumbnail}
        >
          <EditPageMobileThumbnailText>
            <MdOutlinePhotoCamera />
          </EditPageMobileThumbnailText>
        </EditPageMobileThumbnailButton>
      </EditPageMobileBodyRightBox>
    </EditPageMobileThumbnailContainer>
  );
};

const EditPageMobileThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const EditPageMobileThumbnailInput = styled.input`
  width: 14.5rem;
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
const EditPageMobileThumbnailButton = styled.label`
  cursor: pointer;
  gap: 0.625rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: { editThumbnail: string }) =>
    props.editThumbnail ? COLORS.gray300 : COLORS.violetB400};
  border-radius: 0.25rem;
`;
const EditPageMobileThumbnailText = styled.p`
  color: ${COLORS.white};
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

export default EditPageMobileThumbnail;
