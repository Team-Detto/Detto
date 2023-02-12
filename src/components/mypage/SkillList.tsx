import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import SkillButton from 'components/common/SkillButton';
import { useEffect, useState } from 'react';
import { positions } from 'utils/positions';
import { ButtonsWrapper } from './PositionCheckBox';

interface SkillListProps {
  category: string;
  skills: string[];
  checkedPositions: string[];
  checkedSkills: string[];
}

const SkillList = ({
  category,
  skills,
  checkedSkills,
  checkedPositions,
}: SkillListProps) => {
  // 유저가 선택한 포지션과의 일치여부에 따라 활성되는 flag
  const [positionFlag, setPositionFlag] = useState(true);

  useEffect(() => {
    if (category !== '개발') {
      // positions로부터 현재 카테고리와 일치하는 type값을 가져오기 위한 객체 탐색
      const currentCategoryObj = positions.find(
        (position) => position.name === category,
      );
      const currentCategory = currentCategoryObj?.type;

      // 유저가 선택한 포지션인 checkedPositions에 현재 카테고리와 일치하는 값이 있는지 확인
      const isMatched = checkedPositions?.findIndex(
        (position) => position === currentCategory,
      );

      isMatched === -1 || isMatched === undefined
        ? setPositionFlag(false)
        : setPositionFlag(true);
    }
  }, [category, checkedPositions]);

  return (
    <>
      <SkillTitle>{category}</SkillTitle>
      <SkillsWRapper>
        {skills.map((skill: string) => {
          const isChecked = positionFlag
            ? checkedSkills?.includes(skill)
            : false;

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
