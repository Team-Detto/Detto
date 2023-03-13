import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { DocumentData } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';

interface ButtonWrapperProps {
  isApplicant: boolean;
  projectData: DocumentData;
  onApplyModalStateChangeEvent: () => void;
  onCloseModalStateChangeEvent: () => void;
}

const ApplyButtonArea = ({
  isApplicant,
  projectData,
  onApplyModalStateChangeEvent,
  onCloseModalStateChangeEvent,
}: ButtonWrapperProps) => {
  const { uid } = useAuth();
  const { openModal } = useGlobalModal();
  const { isRecruiting, applicants } = projectData;
  return (
    <ButtonWrapper>
      {
        projectData?.uid === uid ? (
          //작성자 버튼
          <ApplyButton
            onClick={onCloseModalStateChangeEvent}
            disabled={!isRecruiting}
          >
            {isRecruiting ? '지원공고 마감하기' : '마감 완료'}
          </ApplyButton>
        ) : //작성자가 아닌 사람에 대해 모집중인 글이면
        isRecruiting ? (
          applicants?.[uid]?.recruit ? ( //이미 초대된 경우
            <ApplyButton disabled={true}>이미 초대되었어요!</ApplyButton>
          ) : (
            <ApplyButton
              onClick={() => {
                if (!uid) {
                  openModal('login', 0);
                  return;
                }
                isApplicant //지원하고 초대는 안된 상태
                  ? onCloseModalStateChangeEvent()
                  : onApplyModalStateChangeEvent();
              }}
            >
              {isApplicant ? '지원 취소' : '간단 지원하기'}
            </ApplyButton>
          )
        ) : (
          <ApplyButton disabled={true}>모집이 마감되었어요!</ApplyButton>
        ) // 모집이 마감된경우
      }
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
  border-radius: 1.25rem;
  font-size: 1.75rem;
  color: ${COLORS.white};
  font-weight: 700;
  transition: all 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB300};
  }

  &:disabled {
    background-color: ${COLORS.gray750};
  }
`;
