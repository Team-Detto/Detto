import styled from '@emotion/styled';
import ProjectItem from './ProjectItem';
import { useFindProject, useProjectList } from 'hooks';
import { useQuery } from '@tanstack/react-query';

import { EditType } from 'types/write/writeType';

export interface PidListProps {
  likedProjects: string[];
  appliedProjects: string[];
  currentProjects: string[];
  postedProjects: string[];
}

interface ProjectListProps {
  category: string;

  pidList: PidListProps;
}

const ProjectList = ({ category, pidList }: ProjectListProps) => {
  // 현재 선택된 탭의 pid list 지정 함수
  const currentPidList = pidList.likedProjects;

  const { getActiveProjects } = useProjectList();
  const { handleNavigateToProjectDetail } = useFindProject();
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
