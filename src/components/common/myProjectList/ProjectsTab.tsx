import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { projectTabNames } from 'utils/positions';

export interface ProjectsTabProps {
  type?: string;
  category: string;
  onTabClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const ProjectsTab = ({ type, category, onTabClick }: ProjectsTabProps) => {
  return (
    <ProjectsTabContainer type={type}>
      {/* 공개프로필 탭 */}
      {type &&
        projectTabNames.map((tabname, index) => {
          if (index === 1 || index === 2) {
            return (
              <ProjectsTabButton
                key={tabname.id}
                name={tabname.id}
                category={category}
                onClick={onTabClick}
              >
                {tabname.value}
              </ProjectsTabButton>
            );
          }
        })}

      {/* 마이페이지 탭 */}
      {!type &&
        projectTabNames.map((tabName) => (
          <ProjectsTabButton
            key={tabName.id}
            name={tabName.id}
            category={category}
            onClick={onTabClick}
          >
            {tabName.value}
          </ProjectsTabButton>
        ))}
    </ProjectsTabContainer>
  );
};

export default ProjectsTab;

const ProjectsTabContainer = styled.div<{ type?: string }>`
  display: flex;
  width: ${({ type }) => (type === 'public' ? '17rem' : '34rem')};
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.gray100};
  height: 3rem;
  margin: 0 auto 3.5rem;
`;

const ProjectsTabButton = styled.span<{
  name: string;
  category: string;
}>`
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
  transition: all 300ms ease-in-out;
  cursor: pointer;
`;
