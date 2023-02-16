import { useQuery } from '@tanstack/react-query';
import { useFindProject, useProjectList } from 'hooks';
import styled from '@emotion/styled';
import ProjectItem from './ProjectItem';
import { EditType } from 'types/write/writeType';

export interface PidListProps {
  [key: string]: string[];
}

interface ProjectListProps {
  category: string;
  pidList: PidListProps;
}

const ProjectList = ({ category, pidList }: ProjectListProps) => {
  const { getActiveProjects, getFilteredPidList } = useProjectList();
  const { handleNavigateToProjectDetail } = useFindProject();

  const currentPidList =
    category === 'appliedProjects' || category === 'currentProjects'
      ? getFilteredPidList(pidList, category)
      : pidList[category];

  const { data: activeProjectsData }: any = useQuery({
    queryKey: ['activeProjects', currentPidList],
    queryFn: getActiveProjects,
  });

  return (
    <ProjectListContainer>
      {activeProjectsData &&
        activeProjectsData?.map(
          (project: EditType.EditFormType, idx: number) => (
            <ProjectItem
              category={category}
              key={project.createdAt}
              project={project}
              pid={pidList.likedProjects[idx]}
              onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
            />
          ),
        )}
    </ProjectListContainer>
  );
};

export default ProjectList;

const ProjectListContainer = styled.section`
  margin-bottom: 4.875rem;
  cursor: pointer;
`;
