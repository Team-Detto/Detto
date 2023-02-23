import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getProjectIdList } from 'apis/mypageUsers';
import COLORS from 'assets/styles/colors';
import { ProjectListProps } from 'components/common/myProjectList/ProjectList';
import MobileContentCard from 'components/MobileContentCard';
import { useFindProject, useProjectList } from 'hooks';
import { staleTime } from 'utils/staleTime';

const MobileProjectList = ({ category, pidList }: ProjectListProps) => {
  const { getActiveProjects, getFilteredPidList } = useProjectList();
  const { likedProjects, handleNavigateToProjectDetail } = useFindProject();

  // 현재 활성화된 탭의 프로젝트 아이디(pid) 리스트
  const currentPidList =
    (category === 'appliedProjects' || category === 'currentProjects'
      ? getFilteredPidList(pidList, category)
      : pidList?.[category]) ?? [];

  const { data: activeProjectsData }: any = useQuery({
    queryKey: ['myProjects', currentPidList],
    queryFn: getActiveProjects,
    staleTime: staleTime.myProjects,
    enabled: !!currentPidList,
  });

  const { data: projectIdList }: any = useQuery({
    queryKey: ['post', 'projectIdList'],
    queryFn: getProjectIdList,
    staleTime: staleTime.filterPost,
  });

  const filteredPidList = pidList?.[category]?.filter((pid) => {
    if (projectIdList?.includes(pid)) {
      return pid;
    }
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
            pid={filteredPidList[idx]}
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
