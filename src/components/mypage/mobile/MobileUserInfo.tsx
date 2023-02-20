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
import ConfirmAlert from 'components/common/ConfirmAlert';
import ValidationToastPopup from 'components/common/ValidationToastPopup';

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
        {/* TODO:: 기술스택 추가 예정 */}
      </MobileInfoBox>
      <MobileInfoBox>
        <MobileInfoEditBtn
          isActive={activeInfoBtn}
          onClick={handleUserInfoConfirm}
          disabled={!activeInfoBtn}
        >
          개인정보 수정 완료
        </MobileInfoEditBtn>
      </MobileInfoBox>
      <ConfirmAlert
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
  width: 22.5rem;
  min-height: 29.6875rem;
  margin: 1.625rem 0.9375rem;
  background: ${COLORS.white};
`;

const MobileInfoBox = styled.div`
  width: 18.5rem;
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