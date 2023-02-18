import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useModal, useUpdateProfile, useProfileImage } from 'hooks';
import styled from '@emotion/styled';
import { mypageInfoButtonActiveState } from '../../recoil/atoms';
import MyPageProfileImage from './MyPageProfileImage';
import PositionCheckBox from './PositionCheckBox';
import SkillList from './SkillList';
import TextInput from './TextInput';
import Careers from './Careers';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { designs, develops, products } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import { updateUserInfoData } from 'apis/mypageUsers';

interface MypageInfoProps {
  user: User;
  uid: string;
}

const MyPageInfo = ({ user, uid }: MypageInfoProps) => {
  const {
    userInfo,
    setUserInfo,
    handleInputChange,
    validationMessage,
    contactValidationMessage,
  } = useUpdateProfile();
  const { isOpen, handleModalStateChange } = useModal(false);
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfo.photoURL);
  const activeInfoBtn = useRecoilValue<boolean>(mypageInfoButtonActiveState);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  // DB로 수정 정보 업데이트
  const handleUserInfoUpdate = () => {
    updateUserInfoMutate();
    handleModalStateChange();
  };

  useEffect(() => {
    if (!user) return;

    setUserInfo({
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      isJunior: user?.isJunior,
      positions: user?.positions,
      plannerStack: user?.plannerStack || [''],
      designerStack: user?.designerStack || [''],
      developerStack: user?.developerStack || [''],
    });
  }, [user]);

  return (
    <MyPageTopContainer>
      <MypageInfoTopContainer>
        <MyPageProfileImage
          profileImg={profileImg}
          onChange={handleProfileImageChange}
          onDelete={handleProfileImageDelete}
          setUserInfo={setUserInfo}
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
            {/* TODO :: 연락처 관련 로직 수정 필요 */}
            <InfoTitle htmlFor="contact">연락처</InfoTitle>
            <TextInput
              name="email"
              value={userInfo.email ?? ''}
              onChangeValue={handleInputChange}
              placeholder="연락처로 쓰일 이메일을 입력해주세요."
              validationMessage={contactValidationMessage}
            />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>경력</InfoTitle>
            <Careers isJunior={userInfo.isJunior} setUserInfo={setUserInfo} />
          </InfoItemDiv>
          <InfoItemDiv>
            <InfoTitle>포지션</InfoTitle>
            <PositionCheckBox
              positions={userInfo.positions}
              setUserInfo={setUserInfo}
            />
          </InfoItemDiv>
        </InfoWrapper>
      </MypageInfoTopContainer>
      <MyPageSkillsWrapper>
        <MyPageSkillsTitle>기술스택</MyPageSkillsTitle>
        <MypageSkillBox>
          <SkillList
            category="기획"
            skills={products}
            checkedSkills={userInfo.plannerStack}
            setUserInfo={setUserInfo}
          />
          <SkillList
            category="디자인"
            skills={designs}
            checkedSkills={userInfo.designerStack}
            setUserInfo={setUserInfo}
          />
          <SkillList
            category="개발"
            skills={develops}
            checkedSkills={userInfo.developerStack}
            setUserInfo={setUserInfo}
          />
        </MypageSkillBox>
      </MyPageSkillsWrapper>

      <InfoEditConfirmWrapper>
        <InfoEditConfirmBtn
          isActive={activeInfoBtn}
          onClick={handleModalStateChange}
        >
          개인정보 수정 완료
        </InfoEditConfirmBtn>
      </InfoEditConfirmWrapper>
      <ConfirmAlert
        isOpen={isOpen}
        message="개인정보를 수정할까요?"
        subMessage="수정한 정보는 곧바로 반영됩니다!"
        onClickEvent={handleUserInfoUpdate}
        onCloseEvent={handleModalStateChange}
      />
    </MyPageTopContainer>
  );
};

export default MyPageInfo;

const MyPageTopContainer = styled.div``;

const MypageInfoTopContainer = styled.div`
  padding-top: 3.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoWrapper = styled.div``;

const InfoItemDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.625rem;
`;

const InfoTitle = styled.label`
  display: block;
  width: 4rem;
  font-size: 1.25rem;
  color: #383838;
  text-align: right;
  margin-right: 3rem;
`;

const MyPageSkillsWrapper = styled.div`
  margin-top: 3.125rem;
`;

const MyPageSkillsTitle = styled.h2`
  font-size: 1.75rem;
  color: #383838;
  margin-bottom: 1.5rem;
`;

const MypageSkillBox = styled.div``;

const InfoEditConfirmWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 4.875rem;
`;

const InfoEditConfirmBtn = styled.button<{ isActive: boolean }>`
  margin-top: 2rem;
  width: 14.375rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${({ isActive }) =>
    isActive ? COLORS.violetB500 : COLORS.gray100};
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray750)};
  transition: all 300ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB300};
    color: ${COLORS.white};
  }
`;
