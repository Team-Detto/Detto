import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled from '@emotion/styled';
import { useModal, useUpdateProfile } from 'hooks';
import useProfileImage from 'hooks/useProfileImage';
import MyPageProfileImage from './MyPageProfileImage';
import PositionCheckBox from './PositionCheckBox';
import SkillList from './SkillList';
import NicknameInput from './NicknameInput';
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
  const [isActive, setIsActive] = useState<boolean>(false);
  const { userInfo, setUserInfo, handleNicknameChange, validationMessage } =
    useUpdateProfile();
  const { isOpen, handleModalStateChange } = useModal(false);
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfo.photoURL);

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  // DB로 수정 정보 업데이트
  const handleUserInfoUpdate = () => {
    setUserInfo((prev) => {
      return {
        ...prev,

        photoURL: profileImg,
      };
    });

    updateUserInfoMutate();
    handleModalStateChange();
  };

  useEffect(() => {
    if (!user) return;

    setUserInfo({
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      isJunior: user?.isJunior,
      positions: user?.positions,
      plannerStack: user?.plannerStack || [''],
      designerStack: user?.designerStack || [''],
      developerStack: user?.developerStack || [''],
    });
  }, [user]);

  useEffect(() => {
    setIsActive(!isActive);
  }, [userInfo]);

  return (
    <MyPageTopContainer>
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
            <NicknameInput
              displayName={userInfo.displayName}
              onChangeNickname={handleNicknameChange}
              validationMessage={validationMessage}
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
          isActive={isActive}
          onClick={handleModalStateChange}
        >
          개인정보 수정 완료
        </InfoEditConfirmBtn>
      </InfoEditConfirmWrapper>
      <ConfirmAlert
        isOpen={isOpen}
        message="게시물을 업로드할까요?"
        subMessage="작성한 게시물은 마이페이지에서 볼 수 있습니다."
        onClickEvent={handleUserInfoUpdate}
        onCloseEvent={handleModalStateChange}
      />
    </MyPageTopContainer>
  );
};

export default MyPageInfo;

const MyPageTopContainer = styled.div``;

const MypageInfoTopContainer = styled.div`
  padding-top: 14.875rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const InfoWrapper = styled.div``;

const InfoItemDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.25rem;
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
  margin-top: 4.875rem;
  width: 14.375rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${({ isActive }) =>
    isActive ? COLORS.violetB500 : COLORS.gray100};
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray750)};
`;
