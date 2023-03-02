import styled from '@emotion/styled';
import SkillButton from 'components/common/SkillButton';
import { designs, develops, products } from 'utils/skills';

export default function SetSkillsPageStack({ skills, setSkills }: any) {
  return (
    <Container>
      <RowContainer>
        <Label>기획</Label>
        <Skills>
          {products.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="plannerStack"
              value={skills.plannerStack}
              setValue={setSkills}
            />
          ))}
        </Skills>
      </RowContainer>
      <RowContainer>
        <Label>디자인</Label>
        <Skills>
          {designs.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="designerStack"
              value={skills.designerStack}
              setValue={setSkills}
            />
          ))}
        </Skills>
      </RowContainer>
      <RowContainer>
        <Label>개발</Label>
        <Skills>
          {develops.map((skill: string) => (
            <SkillButton
              key={skill}
              name={skill}
              type="developerStack"
              value={skills.developerStack}
              setValue={setSkills}
            />
          ))}
        </Skills>
      </RowContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const RowContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Label = styled.div`
  width: 3.25rem;

  font-weight: 500;
  font-size: 0.9375rem;
  line-height: 140%;

  color: #383838;

  margin-right: 0.125rem;
`;

const Skills = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.5rem 1rem;
`;
