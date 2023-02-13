import { useRef } from 'react';
import styled from '@emotion/styled';
import defaultProfile from 'assets/images/default_profile.jpg';
// TODO :: 디폴트 이미지 디자인 나올 경우 파일 경로 수정 필요

interface MyPageProfileImageProps {
  profileImg: string;
  setProfileImg: React.Dispatch<React.SetStateAction<string>>;
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
      <ProfileButtonBox>
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
      </ProfileButtonBox>
    </ProfileImageWrapper>
  );
};

export default MyPageProfileImage;

const ProfileImageWrapper = styled.div`
  width: 12.5rem;
  display: flex;
  flex-direction: column;
  margin-right: 4.625rem;
`;

const ProfileImageBox = styled.div`
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 2.25rem;
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
