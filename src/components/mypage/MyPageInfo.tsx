import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useModal } from 'hooks';
import styled from '@emotion/styled';
import { mypageInfoButtonActiveState, userInfoState } from '../../recoil/atoms';
import UserInfoTop from './UserInfoTop';
import SkillList from './SkillList';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { designs, develops, products } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import { updateUserInfoData } from 'apis/mypageUsers';

interface MypageInfoProps {
  user: User;
  uid: string;
}

const MyPageInfo = ({ user, uid }: MypageInfoProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [activeInfoBtn, setActiveInfoBtn] = useRecoilState<boolean>(
    mypageInfoButtonActiveState,
  );
  const { isOpen, handleModalStateChange } = useModal(false);
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

    setActiveInfoBtn(false);

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
      <UserInfoTop /> {/* 유저 개인 정보  */}
      <MyPageSkillsWrapper>
        <MyPageSkillsTitle>기술스택</MyPageSkillsTitle>
        <MypageSkillBox>
          <SkillList
            category="기획"
            skills={products}
            checkedSkills={userInfo.plannerStack}
          />
          <SkillList
            category="디자인"
            skills={designs}
            checkedSkills={userInfo.designerStack}
          />
          <SkillList
            category="개발"
            skills={develops}
            checkedSkills={userInfo.developerStack}
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
