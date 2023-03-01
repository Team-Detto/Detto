import styled from '@emotion/styled';
import { ButtonsWrapper } from './PositionCheckBox';
import COLORS from 'assets/styles/colors';
import SkillButton from 'components/common/SkillButton';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/atoms';

interface SkillListProps {
  category: string;
  skills: string[];
  checkedSkills: string[];
}

const SkillList = ({ category, skills, checkedSkills }: SkillListProps) => {
  const setUserInfo = useSetRecoilState(userInfoState);
  let stackName = '';

  switch (category) {
    case '기획':
      stackName = 'plannerStack';
      break;
    case '개발':
      stackName = 'developerStack';
      break;
    case '디자인':
      stackName = 'designerStack';
      break;
  }

  return (
    <SkillsContainer>
      <SkillTitle>{category}</SkillTitle>
      <SkillsWRapper>
        {skills.map((skill: string) => {
          const isChecked = checkedSkills?.includes(skill);

          return (
            <SkillButton
              key={skill}
              name={skill}
              isChecked={isChecked ? true : false}
              setValue={setUserInfo}
              type={stackName}
              value={checkedSkills}
            />
          );
        })}
      </SkillsWRapper>
    </SkillsContainer>
  );
};

export default SkillList;

const SkillsContainer = styled.div`
  display: flex;
  margin-bottom: 1.875rem;
`;

const SkillTitle = styled.strong`
  display: block;
  min-width: 3.25rem;
  font-size: 0.875rem;
  color: ${COLORS.gray850};
  margin-top: 0.25rem;
  font-weight: 500;
`;

const SkillsWRapper = styled(ButtonsWrapper)`
  gap: 1.25rem;
`;
