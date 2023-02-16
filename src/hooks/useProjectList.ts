import { findWithCollectionName } from 'apis/findWithCollectionName';
import { useState } from 'react';
import { projectTabNames } from 'utils/positions';

const useProjectList = () => {
  const [activeProjectTab, setActiveProjectTab] =
    useState<string>('likedProjects');

  // 프로젝트 탭 활성화 변경 함수
  const handleProjectTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;

    const tabValueIndex = projectTabNames.findIndex(
      (tabName) => tabName.value === innerText,
    );

    setActiveProjectTab(projectTabNames[tabValueIndex].id);
  };

  // 현재 선택된 탭의 프로젝트 리스트 조회 함수
  const getActiveProjects = async (params: any) => {
    const [_, pidList] = params.queryKey;

    const data = await Promise.all(
      pidList.map((pid: string) => findWithCollectionName('post', pid)),
    );

    return data;
  };

  return {
    activeProjectTab,
    handleProjectTabClick,
    getActiveProjects,
  };
};

export default useProjectList;
