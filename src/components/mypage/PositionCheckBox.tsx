import styled from '@emotion/styled';
import { positions } from 'utils/positions';
import CheckBoxButton from './CheckboxButton';

const PositionCheckBox = () => {
  return (
    <ButtonsWrapper type={'info'}>
      {positions.map((position) => (
        <CheckBoxButton
          key={position.type}
          type={position.type}
          name={position.name}
        />
      ))}
    </ButtonsWrapper>
  );
};

export default PositionCheckBox;

export const ButtonsWrapper = styled.div<{ type?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: ${({ type }) => (type === 'info' ? '0' : '1.5625rem')};
`;
