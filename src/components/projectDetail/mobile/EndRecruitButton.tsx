import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const EndRecruitButton = ({ onClick, isRecruiting }: any) => {
  return (
    <>
      <ButtonWrapper>
        <EndButton onClick={onClick} disabled={!isRecruiting}>
          {isRecruiting ? '지원공고 마감하기' : '마감 완료'}
        </EndButton>
      </ButtonWrapper>
    </>
  );
};

export default EndRecruitButton;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5rem;
`;

const EndButton = styled.button`
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
