import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';

const WritePagePosition = () => {
  return (
    <WritePagePositionContainer>
      <LabelInput
        label="기획"
        text="명"
        input={{
          id: '1',
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
        }}
      />
      <LabelInput
        label="개발"
        text="명"
        input={{
          id: '1',
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
        }}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: '1',
          type: 'text',
          width: '7.5rem',
          height: '2.8125rem',
        }}
      />
    </WritePagePositionContainer>
  );
};

const WritePagePositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default WritePagePosition;
