import {} from 'react';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobilePosition = () => {
  return (
    <WritePageMobilePositionContainer>
      <WritePageMobileBodyLeftBox>
        <WritePageMobileBodyText>필요 포지션</WritePageMobileBodyText>
      </WritePageMobileBodyLeftBox>
      <WritePageMobileBodyRightBox>
        <WritePageMobileBodySelect />
        <WritePageMobileBodyInput id="positions" type="number" />
        <WritePageMobileBodyInputLabel htmlFor="positions">
          명
        </WritePageMobileBodyInputLabel>
        <WritePageMobileBodyAddButton>＋</WritePageMobileBodyAddButton>
      </WritePageMobileBodyRightBox>
    </WritePageMobilePositionContainer>
  );
};

const WritePageMobilePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const WritePageMobileBodyLeftBox = styled.div`
  width: 22%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WritePageMobileBodyRightBox = styled.div`
  width: 75%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;
const WritePageMobileBodyText = styled.p`
  width: 3.625rem;
  height: 1.0625rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;
  color: ${COLORS.gray800};
`;
const WritePageMobileBodySelect = styled.select`
  width: 7.125rem;
  height: 2.6875rem;
  background: ${COLORS.white};
  border: 0.0625rem solid ${COLORS.gray100};
  border-radius: 0.125rem;
`;
const WritePageMobileBodyInput = styled.input`
  width: 5.5625rem;
  height: 2.75rem;
  border: 0.0625rem solid ${COLORS.gray100};
`;
const WritePageMobileBodyInputLabel = styled.label`
  width: 0.6875rem;
  height: 1.75rem;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: ${COLORS.gray800};
`;
const WritePageMobileBodyAddButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  font-weight: 500;
  box-shadow: 0rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  border-radius: 3.125rem;
`;
export default WritePageMobilePosition;