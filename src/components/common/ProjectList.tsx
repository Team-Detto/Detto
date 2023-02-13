import ProjectItem from './ProjectItem';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { Project } from 'pages/MyPage';

interface ProjectListProps {
  sectionTitle: string;
  nickname: string;
  projects: Project[];
}

const ProjectList = ({
  sectionTitle,
  nickname,
  projects,
}: ProjectListProps) => {
  return (
    <ProjectListContainer>
      <ProjectListTitle>{`${nickname}님이 ${sectionTitle}`}</ProjectListTitle>
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ProjectListContainer>
  );
};

export default ProjectList;

const ProjectListContainer = styled.section`
  margin-bottom: 4.875rem;
  cursor: pointer;
`;

const ProjectListTitle = styled.h2`
  margin-bottom: 1.25rem;
  font-size: 1.25rem;
  color: ${COLORS.black};
  font-weight: 500;
`;
