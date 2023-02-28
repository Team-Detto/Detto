import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth, useProfileImage, useUpdateProfile } from 'hooks';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../recoil/atoms';
import Careers from './Careers';
import MyPageProfileImage from './MyPageProfileImage';
import PositionCheckBox from './PositionCheckBox';
import TextInput from './TextInput';

const UserInfoTop = () => {
  const userInfo = useRecoilValue(userInfoState);
  const { handleInputChange, validationMessage, contactValidationMessage } =
    useUpdateProfile();
  const { uid } = useAuth();
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfo.photoURL);

  return (
    <MypageInfoTopContainer>
      <MyPageProfileImage
        profileImg={profileImg}
        onChange={handleProfileImageChange}
        onDelete={handleProfileImageDelete}
        uid={uid}
      />
      <InfoWrapper>
        <InfoItemDiv>
          <InfoTitle htmlFor="nickname">닉네임</InfoTitle>
          <TextInput
            name="displayName"
            value={userInfo.displayName}
            onChangeValue={handleInputChange}
            validationMessage={validationMessage}
          />
        </InfoItemDiv>
        <InfoItemDiv>
          <InfoTitle htmlFor="contact">연락처</InfoTitle>
          <TextInput
            name="email"
            value={userInfo.email ?? ''}
            onChangeValue={handleInputChange}
            placeholder="연락처로 쓰일 이메일을 입력해주세요."
            validationMessage={contactValidationMessage}
            isEmail={true}
          />
        </InfoItemDiv>
        <InfoItemDiv>
          <InfoTitle>경력</InfoTitle>
          <Careers isJunior={userInfo.isJunior} />
        </InfoItemDiv>
        <InfoItemDiv>
          <InfoTitle>포지션</InfoTitle>
          <PositionCheckBox positions={userInfo.positions} />
        </InfoItemDiv>
      </InfoWrapper>
    </MypageInfoTopContainer>
  );
};

export default UserInfoTop;

const MypageInfoTopContainer = styled.div`
  padding-top: 3.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const InfoWrapper = styled.div``;

const InfoItemDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.75rem;
`;

const InfoTitle = styled.label`
  display: block;
  min-width: 2.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${COLORS.gray900};
  margin-right: 1.25rem;
`;
