import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import SkillButton from 'components/common/SkillButton';
import { ButtonsWrapper } from './PositionCheckBox';

interface SkillListProps {
  category: string;
  skills: string[];
  checkedSkills?: string[];
}

const SkillList = ({ category, skills, checkedSkills }: SkillListProps) => {
  return (
    <>
      <SkillTitle>{category}</SkillTitle>
      <SkillsWRapper>
        {skills.map((skill: string) => {
          const isChecked = checkedSkills?.includes(skill);
          return (
            <SkillButton
              key={skill}
              name={skill}
              isChecked={isChecked ? true : false}
            />
          );
        })}
      </SkillsWRapper>
    </>
  );
};

export default SkillList;

const SkillTitle = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.gray850};
  margin-bottom: 0.5625rem;
`;

const SkillsWRapper = styled(ButtonsWrapper)`
  gap: 1rem;
`;