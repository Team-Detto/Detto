import { useState } from 'react';
import { projectTabNames } from 'utils/positions';

const useProjectList = () => {
  const [activeProjectTab, setActiveProjectTab] =
    useState<string>('currentProjects');

  // 프로젝트 탭 활성화 변경 함수
  const handleProjectTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;

    const tabValueIndex = projectTabNames.findIndex(
      (tabName) => tabName.value === innerText,
    );

    setActiveProjectTab(projectTabNames[tabValueIndex].id);
  };

  return {
    activeProjectTab,
    handleProjectTabClick,
  };
};

export default useProjectList;
