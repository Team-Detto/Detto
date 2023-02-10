import LabelInput from 'components/common/LabelInput';
import styled from '@emotion/styled';
import { useWrite } from 'hooks';

const EidtPagePosition = () => {
  const { writeFormValue, handleFormValueChange } = useWrite();

  return (
    <PositionContainer>
      <LabelInput
        label="기획"
        text="명"
        input={{
          id: 'planner',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'planner',
        }}
        value={writeFormValue.positions.planner}
        onChageEvent={handleFormValueChange}
      />
      <LabelInput
        label="디자인"
        text="명"
        input={{
          id: 'designer',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'designer',
        }}
        value={writeFormValue.positions.designer}
        onChageEvent={handleFormValueChange}
      />
      <LabelInput
        label="프론트엔드"
        text="명"
        input={{
          id: 'frontend',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'frontend',
        }}
        value={writeFormValue.positions.frontend}
        onChageEvent={handleFormValueChange}
      />
      <LabelInput
        label="백엔드"
        text="명"
        input={{
          id: 'backend',
          type: 'number',
          width: '7.5rem',
          height: '2.8125rem',
          name: 'backend',
        }}
        value={writeFormValue.positions.backend}
        onChageEvent={handleFormValueChange}
      />
    </PositionContainer>
  );
};

const PositionContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export default EidtPagePosition;
