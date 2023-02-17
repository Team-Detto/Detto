import { MutableRefObject } from 'react';
import TextEdiotr from 'components/TextEditor';
import { WriteType } from 'types/write/writeType';
import styled from '@emotion/styled';

interface props {
  editRef: MutableRefObject<any>;
  writeFormValue: WriteType.WriteFormType;
  onOpenButtonClickEvent: () => void;
}

const ProjectWritePageFooter = ({ editRef, onOpenButtonClickEvent }: props) => {
  return (
    <ProjectWritePageFooterContainer>
      <ProjectWritePageFooterEditBox>
        <TextEdiotr editRef={editRef} />
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
  border: 0.0625rem solid #ced3db;
  z-index: 0;
`;
const ProjectWritePageFooterCompleatedButton = styled.button`
  width: 29.375rem;
  height: 5.5rem;
  background: #6f64f2;
  color: #ffffff;
  border-radius: 2.25rem;
  margin-top: 4rem;
`;
const ProjectWritePageFooterCompleatedText = styled.p`
  font-weight: 700;
  font-size: 1.75rem;
  line-height: 2rem;
  color: #ffffff;
`;

export default ProjectWritePageFooter;
