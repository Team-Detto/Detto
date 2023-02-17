import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { positionList } from 'utils/positions';

interface UserPositionsProps {
  positions: string[];
  isJunior: boolean;
}

const UserPositions = ({ positions, isJunior }: UserPositionsProps) => {
  return (
    <UserPositionDiv>
      {positions?.map((position: string) => {
        const positionIndex = positionList.findIndex(
          (pos) => pos.type === position,
        );
        return (
          <PositionItem key={position}>
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
`;

const PositionItem = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`;
