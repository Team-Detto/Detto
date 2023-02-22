import { MutableRefObject } from 'react';
import TextEdiotr from 'components/TextEditor';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  editRef: MutableRefObject<any>;
  onOpenButtonClickEvent: () => void;
}

const WritePageMobileFooter = ({ editRef, onOpenButtonClickEvent }: Props) => {
  return (
    <WritePageMobileFooterContainer>
      <WritePageMobileFooterEditBox>
        <TextEdiotr editRef={editRef} />
      </WritePageMobileFooterEditBox>
      <WritePageMobileFooterCompleatedButton onClick={onOpenButtonClickEvent}>
        <WritePageMobileFooterCompleatedText>
          작성 완료
        </WritePageMobileFooterCompleatedText>
      </WritePageMobileFooterCompleatedButton>
    </WritePageMobileFooterContainer>
  );
};

const WritePageMobileFooterContainer = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
const WritePageMobileFooterEditBox = styled.div`
  width: 22.25rem;
  height: 25rem;
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
`;
const WritePageMobileFooterCompleatedButton = styled.button`
  width: 17rem;
  height: 3.75rem;
  background-color: ${COLORS.violetB400};
  border-radius: 0.75rem;
  margin-bottom: 2rem;
`;
const WritePageMobileFooterCompleatedText = styled.p`
  font-weight: 700;
  font-size: 1rem;
  line-height: 2rem;
  color: ${COLORS.white};
`;

export default WritePageMobileFooter;
