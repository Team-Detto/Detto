import { useEffect, useState, MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useAuth } from 'hooks';
import { firebaseInfinityScrollProjectDataRequest } from 'apis/boardService';
import { firebaseFindMyInterestRequest } from 'apis/userService';
import { findProjectCategoryState } from '../recoil/atoms';
import { EditType } from 'types/write/writeType';
import { logEvent, getCurrentPathName } from 'utils/amplitude';
import { staleTime } from 'utils/staleTime';

const useFindProject = () => {
  const navigate = useNavigate();
  const { state: categoryFromFooter } = useLocation();

  const { uid } = useAuth();

  const [projects, setProjects] = useState<EditType.EditFormType[]>([]);
  const [category, setCategory] = useRecoilState(findProjectCategoryState);
  const [toggle, setToggle] = useState<boolean>(false);

  const { data: likedProjects } = useQuery({
    queryKey: ['likedProjects', uid],
    queryFn: () => firebaseFindMyInterestRequest(uid),
    staleTime: staleTime.likedProjects,
    enabled: !!uid,
    suspense: true,
  });

  const { fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['post', 'findProject'],
    firebaseInfinityScrollProjectDataRequest,
    {
      getNextPageParam: (lastPage) => lastPage[lastPage.length - 1]?.createdAt,
      onSuccess: (data) => {
        setProjects(() => [...data.pages.flat()]);
      },
    },
  );

  useBottomScrollListener(() => {
    if (!isFetchingNextPage && hasNextPage) fetchNextPage();
  });

  useEffect(() => {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    if (categoryFromFooter !== null) {
      setCategory(categoryFromFooter);
    }
  }, [categoryFromFooter]);

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

  return {
    toggle,
    projects,
    category,
    likedProjects,
    handleToggleClick,
    handleCategoryClick,
    handleNavigateToProjectDetail,
  };
};

export default useFindProject;
