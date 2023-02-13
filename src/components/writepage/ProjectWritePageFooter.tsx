import React from 'react';
import TextEdiotr from 'components/TextEditor';
import { WriteType } from 'types/write/writeType';
import styled from '@emotion/styled';

interface props {
  editRef: React.MutableRefObject<any>;
  writeFormValue: WriteType.WriteFormType;
  onFormValueChagneEvent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // eslint-disable-line no-unused-vars
  onOpenButtonClickEvent: () => void;
}

const ProjectWritePageFooter = ({
  editRef,
  onFormValueChagneEvent,
  onOpenButtonClickEvent,
}: props) => {
  return (
    <ProjectWritePageFooterContainer>
      <ProjectWritePageFooterEditBox>
        <TextEdiotr editRef={editRef} />
      </ProjectWritePageFooterEditBox>
      <ProjectWritePageFooterCompleatedButton onClick={onOpenButtonClickEvent}>
        작성 완료
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
`;
const ProjectWritePageFooterCompleatedButton = styled.button`
  width: 29.375rem;
  height: 5.5rem;
  background: #6f64f2;
  color: #ffffff;
  border-radius: 2.25rem;
  margin-top: 4rem;
`;

export default ProjectWritePageFooter;
