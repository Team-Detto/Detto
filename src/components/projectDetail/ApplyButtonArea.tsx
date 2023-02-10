import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useState } from 'react';

const ApplyButtonArea = ({ projectData, userData }: any) => {
  const [ApplyButtonTitle, setApplyButtonTitle] = useState('간단 지원하기');
  const handleApplyButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setApplyButtonTitle(
      ApplyButtonTitle === '간단 지원하기' ? '지원 취소하기' : '간단 지원하기',
    );
  };
  return (
    <ButtonWrapper>
      <ApplyButton
        onClick={(e) => {
          handleApplyButtonClick(e);
        }}
        backgroundColor={
          ApplyButtonTitle === '간단 지원하기'
            ? `${COLORS.violetB400}`
            : '#464646' //색상표에 없는데 사용되고 있음. 문의하기
        }
      >
        {ApplyButtonTitle}
      </ApplyButton>
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

const ApplyButton = styled.button<{ backgroundColor: string }>`
  width: 32.5625rem;
  height: 5.5rem;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 2.25rem;
  font-size: 1.75rem;
  color: ${COLORS.white};
`;
