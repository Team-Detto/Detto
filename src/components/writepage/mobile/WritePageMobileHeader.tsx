import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { WriteType } from 'types/write/writeType';

interface Props {
  writeFormValue: WriteType.WriteFormType;
  onFormValueChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void; // eslint-disable-line no-unused-vars
}

const WritePageMobileHeader = ({
  writeFormValue,
  onFormValueChangeEvent,
}: Props) => {
  return (
    <WritePageMobileHeaderContainer>
      <WritePageMobileHeaderInput
        type="text"
        placeholder="제목입니다."
        name="title"
        maxLength={40}
        value={writeFormValue.title}
        onChange={onFormValueChangeEvent}
      />
    </WritePageMobileHeaderContainer>
  );
};

const WritePageMobileHeaderContainer = styled.div`
  width: 100%;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
`;
const WritePageMobileHeaderInput = styled.input`
  width: 22.25rem;
  height: 2.8125rem;
  padding: 0.625rem 1.25rem;
  background: ${COLORS.white};
  border-radius: 0.5rem;
  border: 0.0625rem solid ${COLORS.gray100};
`;
export default WritePageMobileHeader;
