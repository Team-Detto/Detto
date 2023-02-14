import { useCallback } from 'react';
import styled from '@emotion/styled';
import { ButtonsWrapper } from './PositionCheckBox';
import COLORS from 'assets/styles/colors';
import CheckBoxButton from './CheckboxButton';
import { UserInfo } from 'types/mypage/userInfo';

interface SkillListProps {
  category: string;
  skills: string[];
  checkedSkills: string[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  handleButtonActive: () => void;
}

const SkillList = ({
  category,
  skills,
  checkedSkills,
  setUserInfo,
  handleButtonActive,
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

  // TODO :: 기술스택 로직 정리 필요 ((하드코딩이다))
  // 체크된 값, 체크되지 않은 값을 구분하여 state 갱신
  const handleCheckedPositionsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleButtonActive();
      const { value, checked } = e.target;

      switch (category) {
        case '기획': {
          if (checked) {
            setUserInfo((prevState) => {
              return {
                ...prevState,
                plannerStack: [...prevState.plannerStack, value],
              };
            });
          } else {
            // 체크 해제된 값 필터링하기
            setUserInfo((prevState) => {
              return {
                ...prevState,
                plannerStack: prevState.plannerStack.filter(
                  (position) => position !== value,
                ),
              };
            });
          }
          break;
        }

        case '개발': {
          if (checked) {
            setUserInfo((prevState) => {
              return {
                ...prevState,
                developerStack: [...prevState.developerStack, value],
              };
            });
          } else {
            // 체크 해제된 값 필터링하기
            setUserInfo((prevState) => {
              return {
                ...prevState,
                developerStack: prevState.developerStack.filter(
                  (position) => position !== value,
                ),
              };
            });
          }
          break;
        }

        case '디자인': {
          if (checked) {
            setUserInfo((prevState) => {
              return {
                ...prevState,
                designerStack: [...prevState.designerStack, value],
              };
            });
          } else {
            // 체크 해제된 값 필터링하기
            setUserInfo((prevState) => {
              return {
                ...prevState,
                designerStack: prevState.designerStack.filter(
                  (position) => position !== value,
                ),
              };
            });
          }
          break;
        }
      }

      //   if (checked) {
      //     setUserInfo((prevState) => {
      //       return {
      //         ...prevState,
      //         [name]: [...prevState.designerStack, value],
      //       };
      //     });
      //   } else {
      //     // 체크 해제된 값 필터링하기
      //     setUserInfo((prevState) => {
      //       return {
      //         ...prevState,
      //         [name]: prevState.designerStack.filter(
      //           (position) => position !== value,
      //         ),
      //       };
      //     });
      //   }
    },
    [],
  );

  return (
    <>
      <SkillTitle>{category}</SkillTitle>
      <SkillsWRapper>
        {/* {skills.map((skill: string) => {
          const isChecked = checkedSkills?.includes(skill);
          return (
            <SkillButton
              key={skill}
              name={skill}
              isChecked={isChecked ? true : false}
              value={checkedSkills}
            />
          );
        })} */}
        {skills.map((skill: string) => {
          const isCheckedSkill = checkedSkills?.includes(skill);
          return isCheckedSkill ? (
            <CheckBoxButton
              key={skill}
              type={skill}
              name={skill}
              isChecked={true}
              stackName={stackName}
              onChange={handleCheckedPositionsChange}
            />
          ) : (
            <CheckBoxButton
              key={skill}
              type={skill}
              name={skill}
              stackName={stackName}
              onChange={handleCheckedPositionsChange}
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
