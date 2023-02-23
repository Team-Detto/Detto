import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { positionList } from 'utils/positions';

interface UserPositionsProps {
  positions: string[];
  isJunior: boolean;
  version?: string;
}

const UserPositions = ({
  positions,
  isJunior,
  version = 'web',
}: UserPositionsProps) => {
  let contPosition = 0;
  return (
    <UserPositionDiv version={version}>
      {positions?.map((position: string) => {
        const positionIndex = positionList.findIndex(
          (pos) => pos.type === position,
        );
        return (
          <PositionItem
            key={position}
            positions={positions}
            isJunior={isJunior}
            version={version}
          >
            {positionList[positionIndex].name}
          </PositionItem>
        );
      })}

      {isJunior ? '🌱' : ''}
    </UserPositionDiv>
  );
};

export default UserPositions;

const UserPositionDiv = styled.div`
  color: ${COLORS.gray750};
  font-weight: 500;
  display: flex;
  align-items: center;
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '0.75rem' : ''};
`;

const PositionItem = styled.span<{
  positions: string[];
  isJunior: boolean;
  version: string;
}>`
  display: inline-block;
  margin-right: ${({ positions, isJunior }) =>
    positions.length === 1 && isJunior === false ? '0' : '0.6rem'};
  position: relative;

  &::after {
    content: '';
    width: 0.0625rem;
    height: 0.75rem;
    background-color: ${COLORS.gray500};
    position: absolute;
    right: -0.3rem;
    top: ${({ version }) => (version === 'mobile' ? '0.25rem' : ' 0.625rem')};
  }

  &:last-child::after {
    display: none;
  }
`;
