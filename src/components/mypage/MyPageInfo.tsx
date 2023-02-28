import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useModal, useUpdateProfile } from 'hooks';
import styled from '@emotion/styled';
import { mypageInfoButtonActiveState, userInfoState } from '../../recoil/atoms';
import UserInfoTop from './UserInfoTop';
import SkillList from './SkillList';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { designs, develops, products } from 'utils/skills';
import COLORS from 'assets/styles/colors';
import Alert from 'components/common/Alert';
import { getCurrentPathName, logEvent } from 'utils/amplitude';
import { ProjectsTabContainer } from 'components/common/myProjectList/ProjectsTab';

const MyPageInfo = ({ user }: MypageInfoProps) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [activeInfoBtn, setActiveInfoBtn] = useRecoilState<boolean>(
    mypageInfoButtonActiveState,
  );
  const { isOpen, handleModalStateChange } = useModal(false);
  const {
    updateUserInfoMutate,
    showToast,
    ToastMessage,
    checkInfoValidation,
    defaultUserInfo,
    updateDefaultUserInfoState,
  } = useUpdateProfile();

  // 수정 버튼 클릭 시 유효성 검사 확인 후 변경사항 반영, 모달창 오픈
  const handleUserInfoConfirm = () => {
    if (!checkInfoValidation()) return;

    handleModalStateChange();
    // DB로 수정 정보 업데이트
    updateUserInfoMutate();
    setActiveInfoBtn(false);
    updateDefaultUserInfoState(userInfo);
  };

  useEffect(() => {
    if (!user) return;

    setActiveInfoBtn(false);
    updateDefaultUserInfoState(user);

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

  // 기존 정보에서 변경된 정보가 있을 경우에만 수정버튼 활성화
  useEffect(() => {
    if (JSON.stringify(defaultUserInfo) !== JSON.stringify(userInfo)) {
      setActiveInfoBtn(true);
    } else {
      setActiveInfoBtn(false);
    }
  }, [userInfo]);

  return (
    <MyPageTopContainer>
      {showToast && <ValidationToastPopup message={ToastMessage} top={4} />}
      <UserInfoTop /> {/* 유저 개인 정보  */}
      <MyPageSkillsWrapper>
        <MypageSkillsTabContainer>
          <MyPageSkillsTitle>기술스택</MyPageSkillsTitle>
        </MypageSkillsTabContainer>
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
          onClick={() => {
            handleUserInfoConfirm();
            logEvent('Button Click', {
              from: getCurrentPathName(),
              to: 'none',
              name: 'update_profile',
            });
          }}
          disabled={!activeInfoBtn}
        >
          개인정보 수정 완료
        </InfoEditConfirmBtn>
      </InfoEditConfirmWrapper>
      <Alert
        isOpen={isOpen}
        mainMsg="수정이 완료되었어요!"
        subMsg="수정한 정보가 곧바로 반영되었습니다!"
        onClickEvent={handleModalStateChange}
      />
    </MyPageTopContainer>
  );
};

export default MyPageInfo;

const MyPageTopContainer = styled.div``;

const MyPageSkillsWrapper = styled.div`
  margin-top: 3.125rem;
`;

const MypageSkillsTabContainer = styled(ProjectsTabContainer)`
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const MyPageSkillsTitle = styled.span`
  display: block;
  max-width: 8rem;
  height: 100%;
  padding: 0.75rem 0.375rem;
  border-bottom: 2px solid ${COLORS.violetB500};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${COLORS.violetA500};
`;

const MypageSkillBox = styled.div``;

const InfoEditConfirmWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4.875rem;
`;

export const InfoEditConfirmBtn = styled.button<{ isActive: boolean }>`
  margin-top: 2rem;
  width: 14.375rem;
  height: 3rem;
  border-radius: 4px;
  background-color: ${({ isActive }) =>
    isActive ? COLORS.violetB500 : COLORS.gray100};
  color: ${({ isActive }) => (isActive ? COLORS.white : COLORS.gray750)};
  transition: all 100ms ease-in-out;
  font-weight: 700;

  &:disabled {
    pointer-events: none;
  }

  &:not(:disabled):hover {
    background-color: ${COLORS.violetB400};
    color: ${COLORS.white};
  }
`;
