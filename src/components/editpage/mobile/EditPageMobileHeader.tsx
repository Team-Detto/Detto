import { EditType } from 'types/write/writeType';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  editFormValue: EditType.EditFormType;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditPageMobileHeader = ({
  editFormValue,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <EditPageMobileHeaderContainer>
      <EditPageMobileHeaderInput
        placeholder="제목입니다."
        name="title"
        maxLength={40}
        value={editFormValue?.title || ''}
        onChange={onFormValueChangeEvent}
      />
    </EditPageMobileHeaderContainer>
  );
};

const EditPageMobileHeaderContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
const EditPageMobileHeaderInput = styled.input`
  width: 22.25rem;
  height: 2.8125rem;
  padding: 0.625rem 1.25rem;
  background: ${COLORS.white};
  border-radius: 0.5rem;
  border: 0.0625rem solid ${COLORS.gray100};
`;

export default EditPageMobileHeader;
