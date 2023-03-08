import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useIsMobile } from 'hooks';
import { useCallback } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface props {
  motive: string;
  clickValue: number;
  handleToastPopup: (message: string) => void;
  onClickEvent: () => void;
  onAlertClickEvent: () => void;
  handleResetButtonClick: () => void;
}

const ApplyModalButtonArea = ({
  motive,
  clickValue,
  handleToastPopup,
  onClickEvent,
  onAlertClickEvent,
  handleResetButtonClick,
}: props) => {
  // 지원하기 유효성 검사
  const checkMotiveValidation = useCallback(() => {
    if (clickValue === -1) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    if (motive.trim() === '') {
      handleToastPopup('지원동기를 입력해주세요.');
      return false;
    }
    if (motive.trim().length < 10 || motive.trim().length > 500) {
      handleToastPopup('지원동기는 10자 이상 500자 이하로 입력해주세요.');
      return false;
    }
    return true;
  }, [motive, clickValue]);

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <MobileApplyButtonContainer>
        <MobileApplyButton
          onClick={() => {
            if (!checkMotiveValidation()) return;
            onAlertClickEvent();
            // onClickEvent();
          }}
        >
          지원하기
        </MobileApplyButton>
      </MobileApplyButtonContainer>
    );
  }

  return (
    <ApplyButtonContainer>
      <CloseButton onClick={handleResetButtonClick} />
      <ApplyButton
        onClick={() => {
          if (!checkMotiveValidation()) return;
          onAlertClickEvent();
          // onClickEvent();
        }}
      >
        지원하기
      </ApplyButton>
    </ApplyButtonContainer>
  );
};

export default ApplyModalButtonArea;

const ApplyButtonContainer = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1.25rem;
  width: 39.0625rem;
  height: 3.75rem;
`;

const ApplyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 100%;
  height: 3.75rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
`;

const MobileApplyButtonContainer = styled.div`
  width: 100%;
  margin-top: 0.875rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0rem;
  gap: 1rem;
  width: 100%;
  height: 3.25rem;
`;

const MobileApplyButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.625rem;
  gap: 0.625rem;

  width: 18.9063rem;
  height: 3.25rem;
  border-radius: 0.5rem;
  /* violet B 400 */

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
`;

const CloseButton = styled(AiOutlineClose)`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 1.25rem;
  height: 1.25rem;
  color: ${COLORS.gray400};
  cursor: pointer;
`;
