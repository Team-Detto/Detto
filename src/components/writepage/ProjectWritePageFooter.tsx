import { MutableRefObject } from 'react';
import TextEditor from 'components/TextEditor';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface props {
  editRef: MutableRefObject<any>;
  onOpenButtonClickEvent: () => void;
}

const ProjectWritePageFooter = ({ editRef, onOpenButtonClickEvent }: props) => {
  return (
    <ProjectWritePageFooterContainer>
      <ProjectWritePageFooterEditBox>
        <TextEditor editRef={editRef} />
      </ProjectWritePageFooterEditBox>
      <ProjectWritePageFooterCompleatedButton onClick={onOpenButtonClickEvent}>
        <ProjectWritePageFooterCompleatedText>
          작성 완료
        </ProjectWritePageFooterCompleatedText>
      </ProjectWritePageFooterCompleatedButton>
    </ProjectWritePageFooterContainer>
  );
};

const ProjectWritePageFooterContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProjectWritePageFooterEditBox = styled.div`
  width: 73.75rem;
  height: 68.1875rem;
  border: 0.0625rem solid ${COLORS.gray300};
  z-index: 0;
`;

const ProjectWritePageFooterCompleatedButton = styled.button`
  width: 29.375rem;
  height: 5.5rem;
  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
  border-radius: 2.25rem;
  margin-top: 4rem;

  transition: background-color 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;

const ProjectWritePageFooterCompleatedText = styled.p`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2rem;
  color: ${COLORS.white};
`;

export default ProjectWritePageFooter;
