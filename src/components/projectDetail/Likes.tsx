import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { updateLike, updateMyProject } from '../../apis/postDetail'; //여기서 에러 발생 :모듈 또는 해당 형식 선언을 찾을 수 없습니다.
import { findWithCollectionName } from 'apis/findWithCollectionName';
import { useAuth, useGlobalModal } from 'hooks';
import COLORS from 'assets/styles/colors';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import { staleTime } from 'utils/staleTime';

interface LikesProps {
  pid: string;
  version?: string;
  page?: string;
}

const Likes = ({ pid, version = 'web', page = 'detail' }: LikesProps) => {
  const { uid } = useAuth();
  const { openModal } = useGlobalModal();

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

  let countLike = projectLike?.like;
  let isLike = myProjects?.likedProjects.includes(pid);

  const queryClient = useQueryClient();
  const { mutate: updateLikeMutate } = useMutation(
    () => updateLike(pid, countLike),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['post', pid]);
        const previousProjectLike = queryClient.getQueryData(['post', pid]);
        queryClient.setQueryData(['post', pid], () => {
          isLike ? (countLike -= 1) : (countLike += 1);
        });
        return { previousProjectLike };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(['post', pid], context?.previousProjectLike);
      },
      onSettled: () => {
        queryClient.invalidateQueries(['post', pid]);
      },
    },
  );

  const { mutate: updateMyProjectMutate } = useMutation(
    () => updateMyProject(uid, pid, isLike),
    {
      onMutate: async () => {
        await queryClient.cancelQueries(['myProjects', uid]);
        const previousMyProjects = queryClient.getQueryData([
          'myProjects',
          uid,
        ]);
        queryClient.setQueryData(['myProjects', uid], () => {
          isLike = !isLike;
        });
        return { previousMyProjects };
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(
          ['myProjects', uid],
          context?.previousMyProjects,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['myProjects', uid]);
        queryClient.invalidateQueries(['post', 'mostViewed']);
        queryClient.invalidateQueries(['post', 'mostLiked']);
        queryClient.invalidateQueries(['likedProjects', uid]);
        queryClient.invalidateQueries(['post', 'findProject']);
      },
    },
  );

  return (
    <IconButton
      id={`${isLike ? 'like' : 'unlike'} ${pid}`}
      aria-label={isLike ? 'like' : 'unlike'}
      onClick={() => {
        if (!uid) {
          openModal('login', 0);
          return;
        }
        updateLikeMutate();
        updateMyProjectMutate();
        amplitudeToNoneButtonClick('like');
      }}
    >
      {isLike ? (
        <FillHeart version={version} />
      ) : (
        <LineHeart version={version} />
      )}
      <>{page === 'detail' && <span>관심 {countLike ?? ' 0'}</span>}</>
    </IconButton>
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
