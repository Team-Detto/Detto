import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { firebaseInfinityScrollProjectDataRequest } from 'apis/boardService';
import { firebaseFindMyInterestRequset } from 'apis/userService';
import { EditType } from 'types/write/writeType';
import useAuth from './useAuth';

const useFindProject = () => {
  const navigate = useNavigate();

  const { uid } = useAuth();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [likedProjects, setLikedProjects] = useState<string[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(undefined);
  const [category, setCategory] = useState<string>('planner');
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    firebaseInfinityScrollProjectDataRequest(
      setProjects,
      lastVisible,
      setLastVisible,
    );
    if (uid) {
      firebaseFindMyInterestRequset(uid, setLikedProjects);
    }

    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useBottomScrollListener(
    useCallback(() => {
      if (lastVisible) {
        firebaseInfinityScrollProjectDataRequest(
          setProjects,
          lastVisible,
          setLastVisible,
        );
      }
    }, [lastVisible]),
  );

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
    setCategory,
    toggle,
    likedProjects,
    handleCategoryClick,
    handleToggleClick,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
