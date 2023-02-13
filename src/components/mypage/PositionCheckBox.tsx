import styled from '@emotion/styled';
import { positions } from 'utils/positions';
import CheckBoxButton from './CheckboxButton';

interface PositionCheckBoxProps {
  userPoisitons: string[];
}

const PositionCheckBox = ({ userPoisitons }: PositionCheckBoxProps) => {
  return (
    <ButtonsWrapper type={'info'}>
      {positions.map((position) => {
        const checkPosition = userPoisitons?.find(
          (userPosition) => userPosition === position.type,
        );

        return checkPosition ? (
          <CheckBoxButton
            key={position.type}
            type={position.type}
            name={position.name}
            isChecked={true}
          />
        ) : (
          <CheckBoxButton
            key={position.type}
            type={position.type}
            name={position.name}
          />
        );
      })}
    </ButtonsWrapper>
  );
};

export default PositionCheckBox;

export const ButtonsWrapper = styled.div<{ type?: string }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ type }) => (type === 'info' ? '0' : '1.5625rem')};
`;
