import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import {
  useAuth,
  useIsMobile,
  useModal,
  useProfileImage,
  useUpdateProfile,
  useWithdrawal,
} from 'hooks';
import {
  mypageInfoButtonActiveState,
  userInfoState,
} from '../../../recoil/atoms';
import Careers from '../Careers';
import { InfoEditConfirmBtn } from '../MyPageInfo';
import MyPageProfileImage from '../MyPageProfileImage';
import PositionCheckBox from '../PositionCheckBox';
import TextInput from '../TextInput';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import MobileSkillStackList from './MobileSkillStackList';
import MobileAlert from 'components/common/mobile/MobileAlert';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';

const MobileUserInfo = ({ user }: MypageInfoProps) => {
  const { uid } = useAuth();
  const isMobile = useIsMobile();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [activeInfoBtn, setActiveInfoBtn] = useRecoilState<boolean>(
    mypageInfoButtonActiveState,
  );

  const { isOpen, handleModalStateChange } = useModal(false);
  const { profileImg, handleProfileImageChange, handleProfileImageDelete } =
    useProfileImage(uid, userInfo.photoURL);
  const {
    handleInputChange,
    handleInputClear,
    validationMessage,
    contactValidationMessage,
    checkInfoValidation,
    updateUserInfoMutate,
    showToast,
    ToastMessage,
    updateDefaultUserInfoState,
    defaultUserInfo,
  } = useUpdateProfile();
  const {
    isOpen: isWithdrawalModalOpen,
    handleModalStateChange: handlleWithdrawalModalStateChange,
    handleWithdrawalClick,
  } = useWithdrawal();

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
    <MobileUserInfoContainer>
      {showToast && <ValidationToastPopup message={ToastMessage} top={4} />}
      <MyPageProfileImage
        profileImg={profileImg}
        onChange={handleProfileImageChange}
        onDelete={handleProfileImageDelete}
        uid={uid}
      />
      <MobileInfoBox>
        <MobileInfoTitle>닉네임</MobileInfoTitle>
        <TextInput
          name="displayName"
          value={userInfo.displayName}
          onClearValue={handleInputClear}
          onChangeValue={handleInputChange}
          placeholder="닉네임을 입력해주세요."
          validationMessage={validationMessage}
          isMobile={isMobile}
        />
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoTitle>연락처</MobileInfoTitle>
        <TextInput
          name="email"
          value={userInfo.email ?? ''}
          onChangeValue={handleInputChange}
          onClearValue={handleInputClear}
          placeholder="이메일을 입력해주세요."
          validationMessage={contactValidationMessage}
          isEmail={true}
          isMobile={isMobile}
        />
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoTitle>경력</MobileInfoTitle>
        <Careers isJunior={userInfo.isJunior} />
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoTitle>포지션</MobileInfoTitle>
        <MobilePositionBox>
          <PositionCheckBox positions={userInfo.positions} />
        </MobilePositionBox>
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoTitle>기술 스택</MobileInfoTitle>
        <MobileSkillStackList
          designerStack={userInfo?.designerStack}
          plannerStack={userInfo?.plannerStack}
          developerStack={userInfo?.developerStack}
        />
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoEditBtn
          isActive={activeInfoBtn}
          onClick={() => {
            handleUserInfoConfirm();
            amplitudeToNoneButtonClick('update_profile');
          }}
          disabled={!activeInfoBtn}
        >
          개인정보 수정 완료
        </MobileInfoEditBtn>
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileWithdrawalBtn onClick={handlleWithdrawalModalStateChange}>
          회원탈퇴
        </MobileWithdrawalBtn>
      </MobileInfoBox>
      <MobileAlert
        isOpen={isOpen}
        mainMsg="수정이 완료되었어요!"
        subMsg="수정한 정보가 곧바로 반영되었습니다!"
        onClickEvent={handleModalStateChange}
      />
      <MobileConfirmAlert
        isOpen={isWithdrawalModalOpen}
        message={'탈퇴할까요?'}
        subMessage={'탈퇴는 되돌릴 수 없습니다. 신중히 선택해주세요! 🥺'}
        onClickEvent={handleWithdrawalClick}
        onCloseEvent={handlleWithdrawalModalStateChange}
      />
    </MobileUserInfoContainer>
  );
};

export default MobileUserInfo;

const MobileUserInfoContainer = styled.div`
  width: 100%;
  min-height: 29.6875rem;
  margin: 1.625rem 0 4rem;
  background: ${COLORS.white};
`;

const MobileInfoBox = styled.div`
  width: 18.625rem;
  margin: 0 auto;
  &:nth-of-type(2),
  &:nth-of-type(3) {
    label {
      margin-bottom: -0.8rem;
    }
  }
  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
`;

const MobilePositionBox = styled.div`
  width: 20rem;
`;

const MobileInfoTitle = styled.label`
  display: block;
  min-width: 3rem;
  font-size: 0.75rem;
  color: ${COLORS.gray850};
  margin-bottom: 0.75rem;
`;

const MobileInfoEditBtn = styled(InfoEditConfirmBtn)`
  display: block;
  margin: 3.125rem auto 0;
`;

const MobileWithdrawalBtn = styled.span`
  display: flex;
  justify-content: center;
  font-size: 0.75rem;
  color: ${COLORS.gray700};
  text-decoration: underline;
  margin-top: 2.5rem;
`;
