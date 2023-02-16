import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseGetProjectDataRequest } from 'apis/boardService';
import { firebaseFindMyInterestRequset } from 'apis/userService';
import { EditType } from 'types/write/writeType';
import useAuth from './useAuth';

const useFindProject = () => {
  const navigate = useNavigate();

  const { uid } = useAuth();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const [category, setCategory] = useState<string>('planner');
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    firebaseGetProjectDataRequest(setProjects);
    firebaseFindMyInterestRequset(uid, setLikedProjects);
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
    category,
    toggle,
    likedProjects,
    handleCategoryClick,
    handleToggleClick,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
