import { EditType } from 'types/write/writeType';
import styled from '@emotion/styled';

interface Props {
  editFormValue: any;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  border: 1px solid #ced3db;
  border-radius: 4px;
  background: #ffffff;
  padding-left: 1rem;
`;

export default ProjectEditPageHeader;
