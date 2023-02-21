import { MutableRefObject } from 'react';
import TextEdiotr from 'components/TextEditor';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  editRef: MutableRefObject<any>;
  editFormValue: any;
  onModalStateChangeEvent: () => void;
}

const EditPageMobileFooter = ({
  editRef,
  editFormValue,
  onModalStateChangeEvent,
}: Props) => {
  return (
    <EditPageMobileFooterContainer>
      <EditPageMobileFooterEditBox>
        <TextEdiotr editRef={editRef} value={editFormValue.content} />
      </EditPageMobileFooterEditBox>
      <EditPageMobileFooterCompleatedButton onClick={onModalStateChangeEvent}>
        <EditPageMobileFooterCompleatedText>
          수정 완료
        </EditPageMobileFooterCompleatedText>
      </EditPageMobileFooterCompleatedButton>
    </EditPageMobileFooterContainer>
  );
};

const EditPageMobileFooterContainer = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;
const EditPageMobileFooterEditBox = styled.div`
  width: 22.25rem;
  height: 25rem;
  border: 1px solid ${COLORS.gray100};
  border-radius: 0.25rem;
`;
const EditPageMobileFooterCompleatedButton = styled.button`
  width: 17rem;
  height: 3.75rem;
  background-color: ${COLORS.violetB400};
  border-radius: 0.75rem;
`;
const EditPageMobileFooterCompleatedText = styled.p`
  font-weight: 700;
  font-size: 1rem;
  line-height: 2rem;
  color: ${COLORS.white};
`;

export default EditPageMobileFooter;
