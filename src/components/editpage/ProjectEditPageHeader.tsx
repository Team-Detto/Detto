import { ChangeEvent } from 'react';
import { EditType } from 'types/write/writeType';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface Props {
  editFormValue: EditType.EditFormType;
  onFormValueChangeEvent: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ProjectEditPageHeader = ({
  editFormValue,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <HeaderContainer>
      <HeaderInput
        placeholder="제목입니다."
        name="title"
        maxLength={40}
        value={editFormValue?.title || ''}
        onChange={onFormValueChangeEvent}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
`;
const HeaderInput = styled.input`
  width: 73.75rem;
  height: 2.8125rem;
  border: 1px solid ${COLORS.gray300};
  border-radius: 4px;
  background: ${COLORS.white};
  padding-left: 1rem;
`;

export default ProjectEditPageHeader;
