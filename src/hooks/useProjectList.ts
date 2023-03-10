import { findWithCollectionName } from 'apis/findWithCollectionName';
import { PidListProps } from 'components/common/myProjectList/ProjectList';
import { useState } from 'react';
import { getCurrentPathName, logEvent } from 'utils/amplitude';
import { projectTabNames } from 'utils/positions';
import useIsMobile from './useIsMobile';

const useProjectList = () => {
  const isMobile = useIsMobile();
  const [activeProjectTab, setActiveProjectTab] = useState<string>('');

  // 프로젝트 탭 활성화 변경 함수
  const handleProjectTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    let { innerText } = e.currentTarget;
    if (innerText === '모집중') {
      innerText = '작성한';
    }

    const tabValueIndex = projectTabNames.findIndex(
      (tabName) =>
        (isMobile ? tabName.value.split(' ')[0] : tabName.value) === innerText,
    );

    setActiveProjectTab(projectTabNames[tabValueIndex].id);

    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: `category_${
        innerText === '지원한'
          ? 'appliedProjects'
          : projectTabNames[tabValueIndex].id
      }`,
    });
  };

  // 현재 선택된 탭의 프로젝트 리스트 조회 함수
  const getActiveProjects = async (params: any) => {
    const pidList = params.queryKey[1];

    const data = await Promise.all(
      pidList?.map((pid: string) => findWithCollectionName('post', pid)),
    );
    const filteredData = data?.filter((item) => item !== undefined);

    return [...filteredData].reverse(); // 최신순 정렬 위해 reverse
  };

  // 지원한 프로젝트이거나 참여한 프로젝트일 경우 appliedProjects 문서에서 pid 키값을 필터링 해서 꺼내기 위한 함수
  const getFilteredPidList = (pidList: PidListProps, category: string) => {
    const filteredPidList: string[] = [];

    if (pidList === undefined) return filteredPidList;
    for (const [key, value] of Object.entries(pidList.appliedProjects)) {
      // 지원한 프로젝트 : recruited === false (작성자가 초대 전)
      // 참여중 프로젝트 : recruited === true (작성자가 초대 후)

      if (category === 'appliedProjects') {
        Object(value)?.recruited === false ? filteredPidList.push(key) : null;
      } else {
        Object(value)?.recruited === true ? filteredPidList.push(key) : null;
      }
    }

    return [...filteredPidList].reverse();
  };

  return {
    activeProjectTab,
    setActiveProjectTab,
    handleProjectTabClick,
    getActiveProjects,
    getFilteredPidList,
  };
};

export default useProjectList;
