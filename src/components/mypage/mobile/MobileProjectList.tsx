import styled from '@emotion/styled';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjectIdList } from 'apis/mypageUsers';
import COLORS from 'assets/styles/colors';
import { ProjectListProps } from 'components/common/myProjectList/ProjectList';
import MobileContentCard from 'components/MobileContentCard';
import { useFindProject, useProjectList } from 'hooks';
import { useEffect } from 'react';
import { staleTime } from 'utils/staleTime';

const MobileProjectList = ({ category, pidList }: ProjectListProps) => {
  const { getActiveProjects, getFilteredPidList } = useProjectList();
  const { likedProjects, handleNavigateToProjectDetail } = useFindProject();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['post', 'projectIdList']);
  }, []);
  // 전체 pid 리스트
  const { data: projectIdList }: any = useQuery({
    queryKey: ['post', 'projectIdList'],
    queryFn: getProjectIdList,
    staleTime: staleTime.filterPost,
  });

  // 현재 활성화된 탭의 pid 리스트
  let currentPidList: any;

  if (category) {
    category === 'appliedProjects' || category === 'currentProjects'
      ? (currentPidList = getFilteredPidList(pidList, category))
      : (currentPidList = pidList[category]);
  }
  // 삭제된 pid 필터링
  const filteredPidList = currentPidList?.filter((pid: any) => {
    if (projectIdList?.includes(pid)) {
      return pid;
    }
  });

  // 필터링된 pid 데이터 조회
  const { data: activeProjectsData }: any = useQuery({
    queryKey: ['myProjects', filteredPidList],
    queryFn: getActiveProjects,
    staleTime: staleTime.myProjects,
    enabled: !!currentPidList,
  });

  return (
    <MobileProjectListContainer>
      {activeProjectsData?.length < 1 && (
        <NodataMessage>프로젝트가 없어요 :/</NodataMessage>
      )}
      {activeProjectsData &&
        filteredPidList &&
        activeProjectsData?.map((project: any, idx: number) => (
          <MobileContentCard
            key={project?.createdAt}
            project={project}
            likedProjects={likedProjects}
            pid={filteredPidList?.[filteredPidList?.length - idx - 1]}
            onNavigateToProjectDetailEvent={handleNavigateToProjectDetail}
          />
        ))}
    </MobileProjectListContainer>
  );
};

export default MobileProjectList;

const MobileProjectListContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 0.5625rem;
`;

const NodataMessage = styled.p`
  display: flex;
  justify-content: center;
  min-height: 30rem;
  padding: 6rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${COLORS.gray300};
`;
