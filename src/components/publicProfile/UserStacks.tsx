import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { SkillIcon, SkillIconWrapper } from 'components/common/SkillButton';

interface UserStacksProps {
  stacks: string[];
  version?: 'mobile' | 'web';
  isItem?: boolean;
}

const UserStacks = ({ stacks, isItem, version = 'web' }: UserStacksProps) => {
  if (version === 'mobile') {
    return (
      <MobileStackList>
        {stacks &&
          stacks
            .filter((stack, pos) => stacks.indexOf(stack) === pos)
            .map((stack, index) => {
              if (index < 8)
                return (
                  <MobileStackItem key={`${stacks}${index}`}>
                    {stack}
                  </MobileStackItem>
                );
            })}
      </MobileStackList>
    );
  }

  return (
    <ProjectStackList>
      {stacks
        .filter((stack, pos) => stacks.indexOf(stack) === pos)
        .map((stack, index) => {
          if (index < 10)
            return (
              <ProjectStackItem
                key={`${stacks}${index}`}
                isItem={isItem ?? false}
              >
                <SkillIconWrapper>
                  <SkillIcon
                    src={require(`../../assets/images/icon_skills/icon_skill_${stack.toLowerCase()}.jpg`)}
                    alt={stack}
                  />
                </SkillIconWrapper>
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
  gap: 0.5rem;
`;

const ProjectStackItem = styled.li<{ isItem: boolean }>`
  display: flex;
  align-items: center;
  height: 2rem;
  padding: 0 0.75rem;
  background-color: ${COLORS.gray100};
  border-radius: 2rem;
  font-size: 0.75rem;
  color: ${COLORS.black};
  cursor: ${({ isItem }) => (isItem ? 'pointer' : '')};
`;

//모바일 버전
const MobileStackList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3125rem;
`;

const MobileStackItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 0.625rem;
  color: ${COLORS.gray750};
  cursor: default;
`;
