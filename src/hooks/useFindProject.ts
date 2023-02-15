import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { EditType } from 'types/write/writeType';

const useFindProject = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [category, setCategory] = useState<string>('planner');
  const [toggle, setToggle] = useState(false);

  const filterProjects = projects.filter((project) => {
    const { positions }: any = project;
    return !!positions[category];
  });

  useEffect(() => {
    firebaseGetProjectDataRequest(setProjects);
  }, []);

  const handleCategoryClick = (e: any) => {
    setCategory(e.target.name);
  };

  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  const handleNavigateToProjectDetail = (path: string) => () => {
    navigate(`/project/${path}`);
  };

  return {
    projects,
    filterProjects,
    category,
    toggle,
    handleCategoryClick,
    handleToggleClick,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
