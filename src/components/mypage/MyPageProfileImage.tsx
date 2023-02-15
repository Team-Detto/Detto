import { useRef } from 'react';
import styled from '@emotion/styled';
import { RiPencilFill } from 'react-icons/ri';
import defaultProfile from 'assets/images/default_profile.jpg';
import COLORS from 'assets/styles/colors';
// TODO :: 디폴트 이미지 디자인 나올 경우 파일 경로 수정 필요

interface MyPageProfileImageProps {
  profileImg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  uid: string;
}

const MyPageProfileImage = ({
  profileImg,
  onChange,
  onDelete,
}: MyPageProfileImageProps) => {
  const imgRef = useRef<HTMLInputElement | null>(null);

  return (
    <ProfileImageWrapper>
      <ProfileImageBox>
        <ProfileImage
          src={
            profileImg === '' || profileImg === undefined
              ? defaultProfile
              : profileImg
          }
          alt="프로필이미지"
        />
        <FileInput type="file" id="profile" ref={imgRef} onChange={onChange} />
      </ProfileImageBox>
      <ProfileImgEditButton>
        <EditIcon />
      </ProfileImgEditButton>
      {/* TODO :: 프로필 이미지 수정 모달창 추가 예정 */}
      {/* <ProfileButtonBox>
        <ProfileButton
          type="button"
          btnType={'edit'}
          onClick={() => imgRef.current?.click()}
        >
          수정
        </ProfileButton>
        <ProfileButton type="button" btnType={'delete'} onClick={onDelete}>
          삭제
        </ProfileButton>
      </ProfileButtonBox> */}
    </ProfileImageWrapper>
  );
};

export default MyPageProfileImage;

const ProfileImageWrapper = styled.div`
  width: 9rem;
  display: flex;
  flex-direction: column;
  margin-right: 4.625rem;
  position: relative;
`;

const ProfileImageBox = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2.25rem;
  border: 1px solid ${COLORS.gray100};
  /* box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04); */
`;

const ProfileImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FileInput = styled.input`
  visibility: hidden;
`;

const ProfileButton = styled.button<{ btnType: string }>`
  width: 3.875rem;
  height: 3rem;
  background-color: ${({ btnType }) =>
    btnType === 'edit' ? '#6F64F2' : '#CED3DB'};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: ${({ btnType }) => (btnType === 'edit' ? '700' : '400')};
  color: #fff;

  &:first-of-type {
    margin-right: 1rem;
  }
`;

const ProfileImgEditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 3px;
  bottom: 1.875rem;
  z-index: 100;

  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${COLORS.violetB300};
  border: 1px solid ${COLORS.white};
  cursor: pointer;
  transform: all 300ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB400};
  }
`;

const EditIcon = styled(RiPencilFill)`
  font-size: 1.5rem;
  color: ${COLORS.white};
`;
