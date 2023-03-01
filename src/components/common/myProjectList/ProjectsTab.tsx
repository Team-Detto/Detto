import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { projectTabNames } from 'utils/positions';

export interface ProjectsTabProps {
  type?: string;
  category: string;
  onTabClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  version?: string;
}

const ProjectsTab = ({
  type,
  category,
  onTabClick,
  version = 'web',
}: ProjectsTabProps) => {
  if (version === 'mobile' && type === 'public') {
    return (
      <MobileProjectsTabContainer>
        {type &&
          projectTabNames.map((tabName, index) => {
            if (index === 1 || index === 2) {
              return (
                <MobileProjectsTabButton
                  key={tabName.id}
                  name={tabName.id}
                  category={category}
                  onClick={onTabClick}
                >
                  {tabName.value === '참여한 프로젝트' ? '참여한' : '모집중'}
                </MobileProjectsTabButton>
              );
            }
          })}

        {!type &&
          projectTabNames.map((tabName) => (
            <MobileProjectsTabButton
              key={tabName.id}
              name={tabName.id}
              category={category}
              onClick={onTabClick}
            >
              {tabName.value}
            </MobileProjectsTabButton>
          ))}
      </MobileProjectsTabContainer>
    );
  }

  return (
    <ProjectsTabContainer type={type}>
      {/* 공개프로필 탭 */}
      {type &&
        projectTabNames.map((tabName, index) => {
          if (index === 1 || index === 2) {
            return (
              <ProjectsTabButton
                key={tabName.id}
                name={tabName.id}
                category={category}
                onClick={onTabClick}
              >
                {tabName.value}
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

export const ProjectsTabContainer = styled.div<{ type?: string }>`
  display: flex;
  width: ${({ type }) => (type === 'public' ? '17rem' : '34rem')};
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid ${COLORS.gray100};
  height: 3rem;
  margin: 0 auto 3.5rem;
`;

export const ProjectsTabButton = styled.span<{
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

const MobileProjectsTabContainer = styled.div`
  display: flex;
  width: 108px;
  height: 24px;
  align-items: center;
  margin: 36px auto;
  background-color: ${COLORS.white};
  border-radius: 4px;
`;

const MobileProjectsTabButton = styled.span<{
  name: string;
  category: string;
}>`
  display: block;
  text-align: center;
  width: 54px;
  height: 100%;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  margin-top: 3rem;
  background-color: ${({ category, name }) =>
    name === category ? COLORS.violetB300 : COLORS.gray100};

  color: ${({ category, name }) =>
    name === category ? COLORS.white : COLORS.gray750};
  transition: all 300ms ease-in-out;
  cursor: pointer;
`;
