import styled from '@emotion/styled';
import ConfirmAlert from 'components/common/ConfirmAlert';
import { useIsMobile, useToastPopup } from 'hooks';
import ApplyModalButtonArea from './ApplyModalButtonArea';
import ApplyMotiveArea from './ApplyMotiveArea';
import ApplyPositionArea from './ApplyPositionArea';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import COLORS from 'assets/styles/colors';
import MobileApplyModal from '../mobile/MobileModal/MobileApplyModal';
import useApply from 'hooks/useApply';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  positions: Object;
  pid: string;
}

const ApplyModal = ({ isOpen, onClickEvent, positions, pid }: props) => {
  const {
    motive,
    setMotive,
    clickValue,
    setClickValue,
    onMobileAlertClickEvent,
    isMobileAlertOpen,
    handleResetButtonClick,
    handleApplyButtonClick,
    onAlertClickEvent,
    isAlertOpen,
  } = useApply({ isOpen, onClickEvent, pid });
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <MobileApplyModal
          onClickEvent={onClickEvent}
          isOpen={isOpen}
          showToast={showToast}
          ToastMessage={ToastMessage}
          clickValue={clickValue}
          setClickValue={setClickValue}
          positions={positions}
          motive={motive}
          setMotive={setMotive}
          handleToastPopup={handleToastPopup}
          onMobileAlertClickEvent={onMobileAlertClickEvent}
          isMobileAlertOpen={isMobileAlertOpen}
          handleResetButtonClick={handleResetButtonClick}
          handleApplyButtonClick={handleApplyButtonClick}
        />
      ) : (
        <>
          <WebModalContainer isOpen={isOpen}>
            {showToast && (
              <ValidationToastPopup message={ToastMessage} top={2} />
            )}
            <WebModalTitle>프로젝트를 지원해볼까요?</WebModalTitle>
            <WebContentContainer>
              {/* 포지션 버튼 */}
              <ApplyPositionArea
                positions={positions}
                clickValue={clickValue}
                setClickValue={setClickValue}
              />
              {/* 지원동기 */}
              <ApplyMotiveArea motive={motive} setMotive={setMotive} />
            </WebContentContainer>
            {/* 지원하기 버튼 */}
            <ApplyModalButtonArea
              motive={motive}
              clickValue={clickValue}
              handleToastPopup={handleToastPopup}
              onClickEvent={onClickEvent}
              onAlertClickEvent={onAlertClickEvent}
              handleResetButtonClick={handleResetButtonClick}
            />
          </WebModalContainer>
          {/* 지원성공Alert*/}

          <ConfirmAlert
            isOpen={isAlertOpen}
            message="지원하시겠습니까?"
            subMessage="지원 후에는 수정하거나 확인할 수 없어요."
            onClickEvent={handleApplyButtonClick}
            onCloseEvent={onAlertClickEvent}
          />
        </>
      )}
    </>
  );
};

export default ApplyModal;

const WebModalContainer = styled.div`
  position: fixed;
  width: 41.0625rem;
  height: 34.375rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 1.25rem 1rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 98;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const WebModalTitle = styled.p`
  height: 2.75rem;
  font-weight: 700;
  font-size: 1.75rem;
  margin-top: 2rem;
`;

const WebContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0rem;
  margin-top: 1.25rem;

  width: 39.0625rem;
  height: 21.0625rem;
`;
