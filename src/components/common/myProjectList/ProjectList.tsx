import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DocumentData } from 'firebase/firestore';
import styled from '@emotion/styled';
import { useFindProject, useProjectList } from 'hooks';
import ProjectItem from './ProjectItem';
import { getProjectIdList } from 'apis/mypageUsers';
import COLORS from 'assets/styles/colors';
import { staleTime } from 'utils/staleTime';

export interface PidListProps {
  [key: string]: string[];
}

export interface ProjectListProps {
  category: string;
  pidList: PidListProps;
}

const ProjectList = ({ category, pidList }: ProjectListProps) => {
  const { getActiveProjects, getFilteredPidList } = useProjectList();
  const { handleNavigateToProjectDetail } = useFindProject();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['post', 'projectIdList']); //projectIdList
  }, []);

  // 전체 pid 리스트
  const { data: projectIdList }: DocumentData = useQuery({
    queryKey: ['post', 'projectIdList'],
    queryFn: getProjectIdList,
    staleTime: staleTime.filterPost,
  });

  // 현재 활성화된 탭의 pid 리스트
  let currentPidList: string[] = [];

  if (category) {
    category === 'appliedProjects' || category === 'currentProjects'
      ? (currentPidList = getFilteredPidList(pidList, category))
      : (currentPidList = pidList[category]);
  }

  // 삭제된 pid 필터링
  const filteredPidList = currentPidList?.filter((pid: string) => {
    if (projectIdList?.includes(pid)) {
      return pid;
    }
  });

  // 현재 활성화된 탭의 프로젝트 리스트
  const { data: activeProjectsData }: DocumentData = useQuery({
    queryKey: ['myProjects', filteredPidList],
    queryFn: getActiveProjects,
    staleTime: staleTime.myProjects,
    enabled: !!currentPidList,
  });

  return (
    <ProjectListContainer>
      {activeProjectsData?.length < 1 && (
        <NodataMessage>프로젝트가 없어요 :/</NodataMessage>
      )}
      {activeProjectsData &&
        activeProjectsData?.map(
          (project: EditType.EditFormType, idx: number) => (
            <ProjectItem
              category={category}
              key={project?.createdAt}
              project={project}
              pid={filteredPidList?.[filteredPidList?.length - idx - 1]}
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

const NodataMessage = styled.p`
  display: flex;
  justify-content: center;
  padding: 8rem 0;
  font-size: 2rem;
  font-weight: 700;
  color: ${COLORS.gray200};
  cursor: default;
`;
