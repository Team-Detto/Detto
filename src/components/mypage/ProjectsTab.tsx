import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { projectTabNames } from 'utils/positions';

interface ProjectsTabProps {
  category: string;
}

const ProjectsTab = ({ category }: ProjectsTabProps) => {
  return (
    <ProjectsTabContainer>
      {projectTabNames.map((tabName) => (
        <ProjectsTabButton
          key={tabName.id}
          name={tabName.id}
          category={category}
        >
          {tabName.value}
        </ProjectsTabButton>
      ))}
    </ProjectsTabContainer>
  );
};

export default ProjectsTab;

const ProjectsTabContainer = styled.div`
  display: flex;
  width: 34rem;
  height: 2rem;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.gray100};
  height: 3rem;
  margin: 0 auto 3.5rem;
`;

const ProjectsTabButton = styled.span<{ name: string; category: string }>`
  display: block;
  max-width: 8rem;
  height: 100%;
  padding: 0.75rem 0.375rem;
  border-bottom: ${({ category, name }) =>
    name === category ? `2px solid ${COLORS.violetB500}` : 'none'};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ category, name }) =>
    name === category ? COLORS.violetA500 : COLORS.gray400};
  cursor: pointer;
`;