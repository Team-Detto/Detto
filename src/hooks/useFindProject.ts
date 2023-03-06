import { useEffect, useState, useCallback, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import {
  firebaseGetLikdCountRequest,
  firebaseInfinityScrollProjectDataRequest,
} from 'apis/boardService';
import { firebaseFindMyInterestRequest } from 'apis/userService';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { EditType } from 'types/write/writeType';
import { logEvent, getCurrentPathName } from 'utils/amplitude';
import { staleTime } from 'utils/staleTime';

const useFindProject = () => {
  const navigate = useNavigate();
  const { state: categoryFromFooter } = useLocation();

  const { uid } = useAuth();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(undefined);
  const [category, setCategory] = useState<string>('planner');
  const [toggle, setToggle] = useState<boolean>(false);

  const { data: likedProjects } = useQuery({
    queryKey: ['likedProjects', uid],
    queryFn: () => firebaseFindMyInterestRequest(uid),
    staleTime: staleTime.likedProjects,
    enabled: !!uid,
  });

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

  useEffect(() => {
    if (categoryFromFooter !== null) {
      setCategory(categoryFromFooter);
    }
  }, [categoryFromFooter]);

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

  const handleCategoryClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.target as HTMLButtonElement;
    setCategory(name);
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: `category_${name}`,
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

  const handleUpdateLikedCount = useCallback(async (id: string) => {
    const likeCount = await firebaseGetLikdCountRequest(id);
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, like: likeCount } : project,
      ),
    );
  }, []);

  return {
    toggle,
    projects,
    category,
    likedProjects,
    handleToggleClick,
    handleCategoryClick,
    handleUpdateLikedCount,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
