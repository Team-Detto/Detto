import { MutableRefObject } from 'react';
import TextEditor from 'components/TextEditor';
import { EditType } from 'types/write/writeType';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface Props {
  editRef: MutableRefObject<any>;
  editFormValue: EditType.EditFormType;
  onModalStateChangeEvent: () => void;
}

const ProjectEditPageFooter = ({
  editRef,
  editFormValue,
  onModalStateChangeEvent,
}: Props) => {
  return (
    <FooterContainer>
      <FooterEditBox>
        <TextEditor editRef={editRef} value={editFormValue.content} />
      </FooterEditBox>
      <FooterCompletedButton onClick={onModalStateChangeEvent}>
        <FooterCompletedText>수정 완료</FooterCompletedText>
      </FooterCompletedButton>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FooterEditBox = styled.div`
  width: 73.75rem;
  height: 68.1875rem;
  border: 0.0625rem solid ${COLORS.gray300};
  z-index: 0;
`;
const FooterCompletedButton = styled.button`
  width: 29.375rem;
  height: 5.5rem;
  background: ${COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 2.25rem;
  margin-top: 4rem;
  transition: background-color 100ms ease-in-out;
  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
const FooterCompletedText = styled.p`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2rem;
  color: ${COLORS.white};
`;

export default ProjectEditPageFooter;
