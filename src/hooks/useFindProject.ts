import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { firebaseInfinityScrollProjectDataRequest } from 'apis/boardService';
import { firebaseFindMyInterestRequest } from 'apis/userService';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { EditType } from 'types/write/writeType';
import { logEvent, getCurrentPathName } from 'utils/amplitude';

const useFindProject = () => {
  const navigate = useNavigate();

  const { uid } = useAuth();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(undefined);
  const [category, setCategory] = useState<string>('planner');
  const [toggle, setToggle] = useState<boolean>(false);

  const { data: likedProjects } = useQuery(['likedProjects', uid], () =>
    firebaseFindMyInterestRequest(uid),
  );

  useEffect(() => {
    firebaseInfinityScrollProjectDataRequest(
      setProjects,
      lastVisible,
      setLastVisible,
    );

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
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: `category_${e.target.name}`,
    });
  };

  const handleToggleClick = () => {
    setToggle((prev) => !prev);
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: 'toggle_recruitment',
    });
  };

  const handleNavigateToProjectDetail = (path: string) => () => {
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'project_detail',
      name: 'content_card',
    });
    navigate(`/project/${path}`);
  };

  return {
    toggle,
    projects,
    category,
    likedProjects,
    setCategory,
    handleToggleClick,
    handleCategoryClick,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
