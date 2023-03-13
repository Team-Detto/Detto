import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { Fragment, useState } from 'react';
import { designs, develops, products } from 'utils/skills';

const positions = ['기획', '디자인', '개발'];

const MobileSetSkillsPageStack = ({ skills, setSkills }: any) => {
  const [selectedPosition, setSelectedPosition] = useState<string>('기획');

  const handleSkillButtonClick = (position: string, skill: string) => {
    const stacks = skills[position];

    if (stacks.includes(skill)) {
      setSkills((prev: any) => ({
        ...prev,
        [position]: stacks.filter((item: string) => item !== skill),
      }));
    } else {
      setSkills((prev: any) => ({
        ...prev,
        [position]: [...stacks, skill],
      }));
    }
  };

  return (
    <Container>
      <Buttons>
        {positions.map((position) => (
          <Fragment key={position}>
            <Input
              defaultChecked={position === selectedPosition}
              type="radio"
              name="position"
              id={position}
              value={position}
              onChange={(e) => setSelectedPosition(e.currentTarget.value)}
            />
            <Label htmlFor={position}>{position}</Label>
          </Fragment>
        ))}
      </Buttons>
      <Skills>
        {selectedPosition === '기획' &&
          products.map((skill: string) => (
            <SkillButton
              key={skill}
              type="button"
              name="plannerStack"
              onClick={(e) =>
                handleSkillButtonClick(e.currentTarget.name, skill)
              }
              active={skills.plannerStack.includes(skill)}
            >
              {skill}
            </SkillButton>
          ))}
        {selectedPosition === '디자인' &&
          designs.map((skill: string) => (
            <SkillButton
              key={skill}
              type="button"
              name="designerStack"
              onClick={(e) =>
                handleSkillButtonClick(e.currentTarget.name, skill)
              }
              active={skills.designerStack.includes(skill)}
            >
              {skill}
            </SkillButton>
          ))}
        {selectedPosition === '개발' &&
          develops.map((skill: string) => (
            <SkillButton
              key={skill}
              type="button"
              name="developerStack"
              onClick={(e) =>
                handleSkillButtonClick(e.currentTarget.name, skill)
              }
              active={skills.developerStack.includes(skill)}
            >
              {skill}
            </SkillButton>
          ))}
      </Skills>
    </Container>
  );
};

export default MobileSetSkillsPageStack;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;

  border-bottom: 1px solid ${COLORS.gray100};
  margin-bottom: 1.3rem;
`;

const Label = styled.label`
  padding: 0.75rem 0.375rem;

  font-size: 0.9375rem;
  font-weight: 500;

  color: ${COLORS.gray400};

  cursor: pointer;
`;

const Input = styled.input`
  display: none;

  &:checked + label {
    color: ${COLORS.violetB500};
    font-weight: 700;
    border-bottom: 2px solid ${COLORS.violetB500};
  }
`;

const Skills = styled.div`
  height: 8.3rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  padding: 2px 3px;
  gap: 0.9375rem 0.75rem;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${COLORS.gray100};
    border-radius: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const SkillButton = styled.button<{ active?: boolean }>`
  padding: 0 0.75rem;
  width: 5.25rem;
  height: 2rem;

  background: ${(props) => (props.active ? COLORS.violetB500 : COLORS.gray100)};
  border-radius: 2rem;

  font-weight: ${(props) => (props.active ? 700 : 400)};
  font-size: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.active ? COLORS.white : COLORS.black)};
`;
