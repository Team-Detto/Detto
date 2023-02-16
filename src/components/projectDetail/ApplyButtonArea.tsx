import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';

const ApplyButtonArea = ({
  isApplicant,
  projectData,
  onApplyModalStateChangeEvent,
  onCloseModalStateChangeEvent,
}: any) => {
  const { uid } = useAuth();
  const { isRecruiting } = projectData;

  return (
    <ButtonWrapper>
      {projectData.uid === uid ? (
        <ApplyButton
          onClick={onCloseModalStateChangeEvent}
          disabled={!isRecruiting}
        >
          {isRecruiting ? '지원공고 마감하기' : '마감 완료'}
        </ApplyButton>
      ) : (
        <ApplyButton
          onClick={() => {
            isApplicant
              ? onCloseModalStateChangeEvent()
              : onApplyModalStateChangeEvent();
          }}
        >
          {isApplicant ? '지원취소' : '간단 지원하기'}
        </ApplyButton>
      )}
    </ButtonWrapper>
  );
};

export default ApplyButtonArea;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
`;

const ApplyButton = styled.button`
  width: 32.5625rem;
  height: 5.5rem;
  background-color: ${COLORS.violetB400};
  border-radius: 2.25rem;
  font-size: 1.75rem;
  color: ${COLORS.white};
  :disabled {
    background-color: ${COLORS.gray200};
  }
`;
