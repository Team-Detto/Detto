import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WritePageMobileHeader = () => {
  return (
    <WritePageMobileHeaderContainer>
      <WritePageMobileHeaderInput type="text" placeholder="제목입니다." />
    </WritePageMobileHeaderContainer>
  );
};

const WritePageMobileHeaderContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
const WritePageMobileHeaderInput = styled.input`
  width: 22.25rem;
  height: 2.8125rem;
  padding: 0.625rem 1.25rem;
  background: ${COLORS.white};
  border-radius: 0.5rem;
  border: 0.0625rem solid ${COLORS.gray100};
`;
export default WritePageMobileHeader;
