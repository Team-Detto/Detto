import styled from '@emotion/styled';
import defaultProfile from 'assets/images/default_profile.jpg';
// TODO :: 디폴트 이미지 디자인 나올 경우 파일 경로 수정 필요

interface MyPageProfileImageProps {
  photoUrl: string;
}

const MyPageProfileImage = ({ photoUrl }: MyPageProfileImageProps) => {
  return (
    <ProfileImageWrapper>
      <ProfileImageBox>
        <ProfileImage
          src={
            photoUrl === '' || photoUrl === undefined
              ? defaultProfile
              : photoUrl
          }
          alt="프로필이미지"
        />
      </ProfileImageBox>
      <ProfileButtonBox>
        <ProfileButton btnType={'edit'}>수정</ProfileButton>
        <ProfileButton btnType={'delete'}>삭제</ProfileButton>
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
