import React from 'react';
import { WriteType } from 'types/write/writeType';
import styled from '@emotion/styled';

interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const ProjectWritePageHeader = ({
  writeFormValue,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <WritePageHeaderContainer>
      <WritePageHeaderInput
        placeholder="제목입니다."
        name="title"
        type="text"
        value={writeFormValue.title}
        onChange={onFormValueChangeEvent}
      />
    </WritePageHeaderContainer>
  );
};

const WritePageHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;
const WritePageHeaderInput = styled.input`
  width: 73.75rem;
  height: 2.8125rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  padding-left: 1rem;
`;

export default ProjectWritePageHeader;
