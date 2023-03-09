import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { updateLike, updateMyProject } from '../../apis/postDetail'; //여기서 에러 발생 :모듈 또는 해당 형식 선언을 찾을 수 없습니다.
import { findWithCollectionName } from 'apis/findWithCollectionName';
import { useAuth, useGlobalModal } from 'hooks';
import COLORS from 'assets/styles/colors';
import {
  amplitudeToNoneButtonClick,
  getCurrentPathName,
} from 'utils/amplitude';
import { staleTime } from 'utils/staleTime';
import { logEvent } from '@amplitude/analytics-browser';

interface Props {
  pid: string;
  version?: string;
  page?: string;
}

const Likes = ({ pid, version = 'web', page = 'detail' }: Props) => {
  const { uid } = useAuth();
  const { openModal } = useGlobalModal();

  const handleLikeButton = async (event: any) => {
    event.preventDefault();
    if (isLike) {
      setIsLike(false);
      setCountLike(countLike - 1);
    } else {
      setIsLike(true);
      setCountLike(countLike + 1);
    }
    logEvent('Button Click', {
      from: getCurrentPathName(),
      to: 'none',
      name: 'like',
    });
  };

  //좋아요한 프로젝트 조회
  const { data: myProjects } = useQuery({
    queryKey: ['myProjects', uid],
    queryFn: () => findWithCollectionName('myprojects', uid),
    staleTime: staleTime.myProjects,
    enabled: !!uid,
  });

  const { data: projectLike } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => findWithCollectionName('post', pid),
    staleTime: staleTime.likedProjects,
    enabled: !!pid,
  });

  const [countLike, setCountLike] = useState(projectLike?.like);
  const [isLike, setIsLike] = useState(myProjects?.likedProjects.includes(pid));

  const queryClient = useQueryClient();
  const { mutate: updateLikeMutate } = useMutation(
    () => updateLike(pid, countLike),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]);
      },
    },
  );

  const { mutate: updateMyProjectMutate } = useMutation(
    () => updateMyProject(uid, pid, isLike),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['myProjects', uid]);
        queryClient.invalidateQueries(['post', 'mostViewed']);
        queryClient.invalidateQueries(['post', 'mostLiked']);
        queryClient.invalidateQueries(['likedProjects', uid]);
        queryClient.invalidateQueries(['post', 'findProject']);
      },
    },
  );

  useEffect(() => {
    updateMyProjectMutate();
    updateLikeMutate();
  }, [isLike, countLike]);

  useEffect(() => {
    setCountLike(projectLike?.like);
  }, [projectLike?.like]);

  // 새로고침 시 myProjects가 늦게 불러와져서 추가한 useEffect
  useEffect(() => {
    setIsLike(myProjects?.likedProjects?.includes(pid));
  }, [myProjects?.likedProjects]);

  return (
    <IconButton
      id={`${isLike ? 'like' : 'unlike'} ${pid}`}
      aria-label={isLike ? 'like' : 'unlike'}
      onClick={(event) => {
        if (!uid) {
          openModal('login', 0);
          return;
        }
        handleLikeButton(event);
        amplitudeToNoneButtonClick('like');
      }}
    >
      {isLike ? (
        <FillHeart version={version} />
      ) : (
        <LineHeart version={version} />
      )}
      <>{page === 'detail' && <span>관심 {countLike ?? ' 0'}</span>}</>
    </IconButton> // 로그아웃인 경우 관심 버튼 클릭 시 likedProjects에 데이터가 없어서 로직 에러 발생: 예외처리 필요
  );
};

export default Likes;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FillHeart = styled(AiFillHeart)<{ version: string }>`
  font-size: ${(props) => (props.version === 'mobile' ? '1rem' : '1.5rem')};
  color: ${COLORS.pink};
`;

const LineHeart = styled(AiOutlineHeart)`
  font-size: ${(props: { version: string }) =>
    props.version === 'mobile' ? '1rem' : '1.5rem'};
  color: ${COLORS.gray750};
`;
