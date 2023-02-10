import React from 'react';
import { WriteFormValueType } from 'hooks/useWrite';
import styled from '@emotion/styled';

interface props {
  writeFormValue: WriteFormValueType;
  onFormValueChagneEvent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // eslint-disable-line no-unused-vars
  onOpenButtonClickEvent: () => void;
}

const ProjectWritePageFooter = ({
  writeFormValue,
  onFormValueChagneEvent,
  onOpenButtonClickEvent,
}: props) => {
  return (
    <ProjectWritePageFooterContainer>
      <ProjectWritePageFooterEditBox
        name="content"
        value={writeFormValue.content}
        onChange={onFormValueChagneEvent}
      />
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
const ProjectWritePageFooterEditBox = styled.textarea`
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
