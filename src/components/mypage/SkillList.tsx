import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import SkillButton from 'components/common/SkillButton';
import { ButtonsWrapper } from './PositionCheckBox';

interface SkillListProps {
  category: string;
  skills: string[];
}

const SkillList = ({ category, skills }: SkillListProps) => {
  return (
    <>
      <SkillTitle>{category}</SkillTitle>
      <ButtonsWrapper>
        {skills.map((skill) => (
          <SkillButton key={skill} name={skill} />
        ))}
      </ButtonsWrapper>
    </>
  );
};

export default SkillList;

const SkillTitle = styled.p`
  font-size: 0.75rem;
  color: ${COLORS.gray850};
  margin-bottom: 0.5625rem;
`;
