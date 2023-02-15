import styled from '@emotion/styled';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  findWithCollectionName,
  updateLike,
  updateMyProject,
} from 'apis/postDetail';
import { useEffect, useState } from 'react';
import { RiHeartAddLine, RiHeartAddFill, RiShareBoxLine } from 'react-icons/ri';

const WriterToShareArea = ({ projectData, pid, userData }: any) => {
  const { uid, like, title, content } = projectData;
  const [countLike, setCountLike] = useState(like);
  const [isLike, setIsLike] = useState<boolean>(false); // 관심버튼 클릭시 true/false로 변경, 초기화해주면 동기화 문제 발생
  const { mutate: likeMutate } = useMutation(() => updateLike(pid, countLike));
  const { mutate: likedProjectMutate } = useMutation(() =>
    updateMyProject(uid, pid, isLike),
  );
  const { data: myProjectData } = useQuery({
    queryKey: ['myprojects', uid],
    queryFn: () => findWithCollectionName('myprojects', uid),
  });

  //현재 사용자가 좋아요를 눌렀는지 확인하는 기능
  useEffect(() => {
    setIsLike(myProjectData?.likedProjects?.includes(pid));
  }, [myProjectData]);

  //isLike가 변경될 때마다 좋아요 수 및 좋아요한 프로젝트를 변경해주는 기능
  useEffect(() => {
    likeMutate(pid, countLike);
    likedProjectMutate(uid, pid);
  }, [isLike]);

  //좋아요 기능
  const handleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isLike === true) {
      setCountLike(countLike - 1);
      // 클릭했을 때 true인 경우
    } else if (isLike === false) {
      //클릭했을 때 false인 경우
      setCountLike(countLike + 1);
    }
    setIsLike(!isLike);
  };

  //공유 기능
  const handleShare = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.share({
      title: title,
      text: content,
      url: window.location.href,
    });
  };
  return (
    <WriterToShareContainer>
      <WriterWrapper>
        {/* 게시글 작성자 프로필 이미지/ Todo: 클릭시 공개프로필로 연결? */}
        <WriterProfileImg src={userData?.photoURL} />
        <WriterNickname>{userData?.displayName ?? `닉네임`}</WriterNickname>
      </WriterWrapper>
      <IconWrapper>
        조회 {projectData?.view ?? 0}
        <IconButton
          onClick={(event) => {
            handleLike(event);
          }}
        >
          {/* Todo: 관심버튼 false->true이면 RiHeartAddFill아이콘으로 변경해주고 +1, true->false이면 RiHeartAddLine아이콘으로 변경해주고 -1*/}
          {isLike ? <RiHeartAddFill /> : <RiHeartAddLine />}
          관심 {countLike ?? '없음'}
        </IconButton>
        <IconButton
          onClick={(event) => {
            handleShare(event);
          }}
        >
          <RiShareBoxLine />
          공유
        </IconButton>
      </IconWrapper>
    </WriterToShareContainer>
  );
};

export default WriterToShareArea;

const WriterToShareContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.125rem;
`;

const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 17.4375rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WriterProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #aaaaaa; //영역 표시용 임시 색상
`;

const WriterNickname = styled.p`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
