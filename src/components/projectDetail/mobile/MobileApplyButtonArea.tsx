import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth, useGlobalModal } from 'hooks';

const MobileApplyButtonArea = ({
  isApplicant,
  projectData,
  handleModalOpenChange,
  onCloseModalStateChangeEvent,
}: any) => {
  const { isRecruiting, applicants } = projectData;
  const { uid } = useAuth();
  const { openModal } = useGlobalModal();
  return (
    <ApplyButtonArea>
      {isRecruiting ? ( //모집 중
        applicants?.[uid]?.recruit ? ( //이미 초대된 경우
          <ApplyButton disabled={true}>이미 초대되었어요!</ApplyButton>
        ) : (
          //초대는 안된 경우
          <ApplyButton
            onClick={() => {
              if (!uid) {
                openModal('login', 0);
                return;
              }
              isApplicant //지원하고 초대는 안된 상태
                ? onCloseModalStateChangeEvent() //지원취소
                : handleModalOpenChange(); //간단 지원하기
            }}
          >
            {isApplicant ? '지원 취소' : '간단 지원하기'}
          </ApplyButton>
        )
      ) : null}
    </ApplyButtonArea>
  );
};

export default MobileApplyButtonArea;

const ApplyButtonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 17rem;
  height: 3.75rem;
  background: ${COLORS.violetB400};
  border-radius: 0.75rem;

  font-weight: 700;
  font-size: 1rem;

  color: ${COLORS.white};
  &:disabled {
    background-color: ${COLORS.gray200};
  }
`;
