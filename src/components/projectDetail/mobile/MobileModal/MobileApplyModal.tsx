import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import MobileConfirmAlert from 'components/common/mobile/MobileConfirmAlert';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import ApplyModalButtonArea from 'components/projectDetail/ApplyModal/ApplyModalButtonArea';
import ApplyMotiveArea from 'components/projectDetail/ApplyModal/ApplyMotiveArea';
import ApplyPositionArea from 'components/projectDetail/ApplyModal/ApplyPositionArea';

interface MobileApplyModalProps {
  onClickEvent: () => void;
  isOpen: boolean;
  showToast: boolean;
  ToastMessage: string;
  clickValue: number;
  setClickValue: (value: number) => void;
  positions: string[];
  motive: string;
  setMotive: (value: string) => void;
  handleToastPopup: (message: string) => void;
  onMobileAlertClickEvent: () => void;
  isMobileAlertOpen: boolean;
  handleResetButtonClick: () => void;
  handleApplyButtonClick: () => void;
}

const MobileApplyModal = ({
  onClickEvent,
  isOpen,
  showToast,
  ToastMessage,
  clickValue,
  setClickValue,
  positions,
  motive,
  setMotive,
  handleToastPopup,
  onMobileAlertClickEvent,
  isMobileAlertOpen,
  handleResetButtonClick,
  handleApplyButtonClick,
}: MobileApplyModalProps) => {
  const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClickEvent();
    }
  };

  return (
    <>
      <BackDrop onClick={handleBackDropClick} isOpen={isOpen}>
        <MobileModalContainer>
          {showToast && (
            <ValidationToastPopup message={ToastMessage} top={-2} />
          )}
          <MobileModalTitle>프로젝트를 지원해볼까요?</MobileModalTitle>
          <MobileContentContainer>
            {/* 포지션 버튼 */}
            <ApplyPositionArea
              clickValue={clickValue}
              setClickValue={setClickValue}
              version="mobile"
              positions={positions}
            />
            {/* 지원동기 */}
            <ApplyMotiveArea
              motive={motive}
              setMotive={setMotive}
              version="mobile"
            />
          </MobileContentContainer>
          {/* 아니오, 지원하기 버튼 */}
          <ApplyModalButtonArea
            motive={motive}
            clickValue={clickValue}
            handleToastPopup={handleToastPopup}
            onAlertClickEvent={onMobileAlertClickEvent}
            handleResetButtonClick={handleResetButtonClick}
          />
        </MobileModalContainer>
      </BackDrop>
      <MobileConfirmAlert
        isOpen={isMobileAlertOpen}
        message="지원하시겠습니까?"
        subMessage="지원 후에는 수정하거나 확인할 수 없어요."
        onClickEvent={handleApplyButtonClick}
        onCloseEvent={onMobileAlertClickEvent}
      />
    </>
  );
};

export default MobileApplyModal;

//모바일
const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 98;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
  background: rgba(191, 191, 191, 0.5);
`;

const MobileModalContainer = styled.div`
  position: fixed;
  width: 20rem;
  height: 26.1875rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 1rem;
  text-align: center;
  padding: 1.25rem 1rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 2000;
  display: block;
`;

const MobileModalTitle = styled.p`
  height: 1.625rem;
  font-weight: 700;
  font-size: 1.125rem;
  margin-top: 0rem;
`;

const MobileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  margin-top: 1.125rem;

  width: 100%;
`;
