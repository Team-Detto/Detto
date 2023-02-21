import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { ProjectListProps } from 'components/common/myProjectList/ProjectList';
import { useFindProject, useProjectList } from 'hooks';
import { staleTime } from 'utils/staleTime';

const MobileProjectList = ({ category, pidList }: ProjectListProps) => {
  const { getActiveProjects, getFilteredPidList } = useProjectList();
  const { handleNavigateToProjectDetail } = useFindProject();

  // 현재 활성화된 탭의 프로젝트 아이디(pid) 리스트
  const currentPidList =
    category === 'appliedProjects' || category === 'currentProjects'
      ? getFilteredPidList(pidList, category)
      : pidList[category];

  const { data: activeProjectsData }: any = useQuery({
    queryKey: ['myProjects', currentPidList],
    queryFn: getActiveProjects,
    staleTime: staleTime.myProjects,
    enabled: !!currentPidList,
  });

  // console.log('activeProjectsData', activeProjectsData);

  return (
    <MobileProjectListContainer>
      {/* TODO :: ContentCard 모바일 컴포넌트로 렌더링 필요 */}
    </MobileProjectListContainer>
  );
};

export default MobileProjectList;

const MobileProjectListContainer = styled.div``;
