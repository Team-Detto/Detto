import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface UserStacksProps {
  stacks: string[];
}

const UserStacks = ({ stacks }: UserStacksProps) => {
  return (
    <ProjectStackList>
      {stacks
        .filter((stack, pos) => stacks.indexOf(stack) === pos)
        .map((stack, index) => {
          if (index < 8)
            return (
              <ProjectStackItem key={`${stacks}${index}`}>
                {stack}
              </ProjectStackItem>
            );
        })}
    </ProjectStackList>
  );
};

export default UserStacks;

const ProjectStackList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ProjectStackItem = styled.li`
  display: flex;
  align-items: center;

  height: 2rem;
  padding: 0 0.75rem;
  background-color: ${COLORS.gray100};
  border-radius: 2rem;

  font-size: 0.75rem;
  color: ${COLORS.black};

  cursor: default;
`;
