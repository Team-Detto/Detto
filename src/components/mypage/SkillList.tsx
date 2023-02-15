import styled from '@emotion/styled';
import { ButtonsWrapper } from './PositionCheckBox';
import COLORS from 'assets/styles/colors';
import { UserInfo } from 'types/mypage/userInfo';
import SkillButton from 'components/common/SkillButton';

interface SkillListProps {
  category: string;
  skills: string[];
  checkedSkills: string[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const SkillList = ({
  category,
  skills,
  checkedSkills,
  setUserInfo,
}: SkillListProps) => {
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
              setValue={setUserInfo}
              type={stackName}
              value={checkedSkills}
            />
          );
        })}
      </SkillsWRapper>
    </>
  );
};

export default SkillList;

const SkillTitle = styled.p`
  font-size: 0.875rem;
  color: ${COLORS.gray850};
  margin-bottom: 0.5625rem;
`;

const SkillsWRapper = styled(ButtonsWrapper)`
  gap: 0.75rem;
`;
