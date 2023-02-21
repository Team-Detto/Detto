import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

const MobileApplyButtonArea = ({ handleModalOpenChange }: any) => {
  return (
    <ApplyButtonArea>
      <ApplyButton onClick={handleModalOpenChange}>간단 지원하기</ApplyButton>
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

  color: #ffffff;
`;
