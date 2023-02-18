import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation } from '@tanstack/react-query';
import { useModal, useToastPopup } from 'hooks';
import styled from '@emotion/styled';
import { mypageInfoButtonActiveState, userInfoState } from '../../recoil/atoms';
import UserInfoTop from './UserInfoTop';
import SkillList from './SkillList';
import ConfirmAlert from 'components/common/ConfirmAlert';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { updateUserInfoData } from 'apis/mypageUsers';
import { designs, develops, products } from 'utils/skills';
import { contactValidation } from 'utils/validation';
import COLORS from 'assets/styles/colors';

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
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const { mutate: updateUserInfoMutate } = useMutation(() =>
    updateUserInfoData(uid, userInfo),
  );

  // 유효성 검사
  const checkInfoValidation = () => {
    const nickname = userInfo.displayName;
    if (nickname.length < 2 || nickname.length > 7) {
      handleToastPopup('닉네임은 2자 이상 7자 이하로 입력해주세요.');
      return false;
    }

    if (userInfo.email && !contactValidation(userInfo.email)) {
      handleToastPopup('연락처를 올바르게 입력해주세요.');
      return false;
    }

    if (userInfo.positions.length === 0) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    return true;
  };

  // 수정 버튼 클릭 시 유효성 검사 확인 후 모달창 오픈
  const handleUserInfoConfirm = () => {
    if (!checkInfoValidation()) return;

    handleModalStateChange();
  };

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
      {showToast && <ValidationToastPopup message={ToastMessage} top={4} />}
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
          onClick={handleUserInfoConfirm}
          disabled={!activeInfoBtn}
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
  transition: all 100ms ease-in-out;

  &:disabled {
    pointer-events: none;
  }

  &:not(:disabled):hover {
    background-color: ${COLORS.violetB400};
    color: ${COLORS.white};
  }
`;
