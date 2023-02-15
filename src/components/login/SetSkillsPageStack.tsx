import styled from '@emotion/styled';
import SkillButton from 'components/common/SkillButton';
import { designs, develops, products } from 'utils/skills';

export default function SetSkillsPageStack() {
  return (
    <Container>
      <PositionContainer>
        <PositionLabel>기획</PositionLabel>
        <Skills>
          {products.map((product: string) => (
            <SkillButton
              key={product}
              name={product}
              type="plannerStack"
              // value={writeFormValue?.plannerStack}
              // setValue={setWriteFormValue}
            />
          ))}
        </Skills>
      </PositionContainer>
      <PositionContainer>
        <PositionLabel>디자인</PositionLabel>
        <Skills>
          {designs.map((design: string) => (
            <SkillButton
              key={design}
              name={design}
              type="designerStack"
              // value={writeFormValue?.designerStack}
              // setValue={setWriteFormValue}
            />
          ))}
        </Skills>
      </PositionContainer>
      <PositionContainer>
        <PositionLabel>개발</PositionLabel>
        <Skills>
          {develops.map((develop: string) => (
            <SkillButton
              key={develop}
              name={develop}
              type="developerStack"
              // value={writeFormValue?.developerStack}
              // setValue={setWriteFormValue}
            />
          ))}
        </Skills>
      </PositionContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 63.0625rem;
  display: flex;
  flex-direction: column;
  gap: 2.1875rem;
`;

const PositionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const PositionLabel = styled.div`
  width: 3.5rem;

  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.02em;

  color: #383838;

  margin-right: 0.8125rem;
`;

const Skills = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem 0.75rem;
`;
