import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RiHeartAddLine, RiHeartAddFill } from 'react-icons/ri';
import React from 'react';
import {
  updateLike,
  updateMyProject,
  findWithCollectionName,
} from '../../apis/postDetail'; //여기서 에러 발생 :모듈 또는 해당 형식 선언을 찾을 수 없습니다.

const Likes = ({ pid, uid, like }: any) => {
  const [countLike, setCountLike] = useState(like);
  const { mutate: likeMutate } = useMutation(() => updateLike(pid, countLike));
  const { mutate: likedProjectMutate } = useMutation(() =>
    updateMyProject(uid, pid, isLike),
  );
  const { data: myProjectData } = useQuery({
    queryKey: ['myprojects', uid],
    queryFn: () => findWithCollectionName('myprojects', uid),
  });

  const [isLike, setIsLike] = useState<boolean>(
    myProjectData?.likedProjects?.includes(pid),
  ); // 초기값 false로 설정 시 페이지 이동시 다시 false로 초기화됨, 데이터베이스에서 가져온 값은 로드되는 동안 undefined 이므로 useEffect로 한번 더 설정함

  useEffect(() => {
    setIsLike(myProjectData?.likedProjects?.includes(pid)); //현재 사용자가 좋아요를 눌렀는지 확인하기 위해
  }, [myProjectData]);

  //isLike가 변경될 때마다 좋아요 수 및 좋아요한 프로젝트를 db에서 변경해주는 기능
  //Todo 페이지가 언마운트 될 때 이벤트 주는 방법은?
  useEffect(() => {
    likeMutate(pid, countLike); // 좋아요 수 변경
    likedProjectMutate(pid); // likedProjects에 pid 추가/삭제
  }, [isLike]);

  //좋아요 기능
  const handleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLike(!isLike);
    if (isLike === true) {
      // 클릭했을 때 true인 경우
      setCountLike(countLike - 1);
    } else if (isLike === false) {
      //클릭했을 때 false인 경우
      setCountLike(countLike + 1);
    }
  };
  return (
    <IconButton
      onClick={(event) => {
        handleLike(event);
      }}
    >
      {isLike ? <RiHeartAddFill /> : <RiHeartAddLine />}
      관심 {countLike ?? '없음'}
    </IconButton>
  );
};

export default Likes;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
