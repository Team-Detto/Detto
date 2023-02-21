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
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import MobileSkillStackList from './MobileSkillStackList';

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
    validationMessage,
    contactValidationMessage,
    checkInfoValidation,
    updateUserInfoMutate,
    showToast,
    ToastMessage,
    updateDefaultUserInfoState,
    defaultUserInfo,
  } = useUpdateProfile();

  // 수정 버튼 클릭 시 유효성 검사 확인 후 모달창 오픈
  const handleUserInfoConfirm = () => {
    if (!checkInfoValidation()) return;

    handleModalStateChange();
  };

  // DB로 수정 정보 업데이트
  const handleUserInfoUpdate = () => {
    updateUserInfoMutate();
    handleModalStateChange();
    updateDefaultUserInfoState(userInfo);
  };

  useEffect(() => {
    if (!user) return;

    setActiveInfoBtn(false);
    updateDefaultUserInfoState(userInfo);

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
          onChangeValue={handleInputChange}
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
          placeholder="연락처로 쓰일 이메일을 입력해주세요."
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
        {/* TODO:: pc 버전 마이페이지처럼 유효성 검사 적용 예정, Alert창 변경 예정 */}
        <MobileInfoEditBtn
          isActive={activeInfoBtn}
          onClick={handleUserInfoConfirm}
          disabled={!activeInfoBtn}
        >
          개인정보 수정 완료
        </MobileInfoEditBtn>
      </MobileInfoBox>
      <MobileConfirmAlert
        isOpen={isOpen}
        message="개인정보를 수정할까요?"
        subMessage="수정한 정보는 곧바로 반영됩니다!"
        onClickEvent={handleUserInfoUpdate}
        onCloseEvent={handleModalStateChange}
      />
    </MobileUserInfoContainer>
  );
};

export default MobileUserInfo;

const MobileUserInfoContainer = styled.div`
  width: 100%;
  min-height: 29.6875rem;
  margin: 1.625rem 0;
  background: ${COLORS.white};
  padding-bottom: 5rem;
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
