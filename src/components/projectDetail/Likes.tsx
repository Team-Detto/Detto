import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { updateLike, updateMyProject } from '../../apis/postDetail'; //여기서 에러 발생 :모듈 또는 해당 형식 선언을 찾을 수 없습니다.
import { findWithCollectionName } from 'apis/findWithCollectionName';
import { useAuth, useGlobalModal } from 'hooks';
import COLORS from 'assets/styles/colors';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';

const Likes = ({ pid, version = 'web' }: any) => {
  const { uid } = useAuth();
  const { openModal } = useGlobalModal();

  const handleLikeButton = async (event: any) => {
    event.preventDefault();
    if (isLike) {
      setIsLike(false);
      setIsLike(false);
      setCountLike(countLike - 1);
    } else {
      setIsLike(true);
      setIsLike(true);
      setCountLike(countLike + 1);
    }
  };

  //좋아요한 프로젝트 조회
  const { data: myProjects } = useQuery({
    queryKey: ['myProjects', uid],
    queryFn: () => findWithCollectionName('myprojects', uid),
  });

  const { data: projectLike } = useQuery({
    queryKey: ['post', pid],
    queryFn: () => findWithCollectionName('post', pid),
  });

  const [countLike, setCountLike] = useState(projectLike?.like);
  const [isLike, setIsLike] = useState(myProjects?.likedProjects.includes(pid));

  const queryClient = useQueryClient();
  const { mutate: updateLikeMutate } = useMutation(
    () => updateLike(pid, countLike),
    {
      // onSettled: () => {
      //   queryClient.invalidateQueries(['post', pid]);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries(['post', pid]);
        // setCountLike(projectLike?.like);
      },
    },
  );

  const { mutate: updateMyProjectMutate } = useMutation(
    () => updateMyProject(uid, pid, isLike),
    {
      // onSettled: () => {
      //   queryClient.invalidateQueries(['myProjects', uid]);
      // },
      onSuccess: () => {
        queryClient.invalidateQueries(['myProjects', uid]);
      },
    },
  );
  useEffect(() => {
    setCountLike(projectLike?.like);

    return () => {
      updateMyProjectMutate();
      updateLikeMutate();
      setIsLike(myProjects?.likedProjects.includes(pid));
    };
  }, []);

  useEffect(() => {
    setCountLike(projectLike?.like);
  }, [projectLike?.like]);

  useEffect(() => {
    setIsLike(myProjects?.likedProjects.includes(pid));
  }, [myProjects?.likedProjects]);

  return (
    <IconButton
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
      관심 {countLike ?? ' 0'}
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
