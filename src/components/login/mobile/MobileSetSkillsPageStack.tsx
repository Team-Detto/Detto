import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import SkillButton from 'components/common/SkillButton';
import React, { useState } from 'react';
import { designs, develops, products } from 'utils/skills';

const positions = ['기획', '디자인', '개발'];

export default function MobileSetSkillsPageStack({ skills, setSkills }: any) {
  const [selectedPosition, setSelectedPosition] = useState<string>('기획');

  return (
    <Container>
      <Buttons>
        {positions.map((position) => (
          <React.Fragment key={position}>
            <Input
              defaultChecked={position === selectedPosition}
              type="radio"
              name="position"
              id={position}
              value={position}
              onChange={(e) => setSelectedPosition(e.currentTarget.value)}
            />
            <Label htmlFor={position}>{position}</Label>
          </React.Fragment>
        ))}
      </Buttons>
      <Skills>
        {selectedPosition === '기획' &&
          products.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="plannerStack"
              value={skills.plannerStack}
              setValue={setSkills}
            />
          ))}
        {selectedPosition === '디자인' &&
          designs.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="designerStack"
              value={skills.designerStack}
              setValue={setSkills}
            />
          ))}
        {selectedPosition === '개발' &&
          develops.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="developerStack"
              value={skills.developerStack}
              setValue={setSkills}
            />
          ))}
      </Skills>
    </Container>
  );
}

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

  overflow: auto;

  ::-webkit-scrollbar {
    width: 0.375rem;
  }
  ::-webkit-scrollbar-thumb {
    // 스크롤 막대
    background: ${COLORS.gray100};
    border-radius: 0.25rem;
  }
  ::-webkit-scrollbar-track {
    // 스크롤 배경
    background-color: transparent;
  }
`;
