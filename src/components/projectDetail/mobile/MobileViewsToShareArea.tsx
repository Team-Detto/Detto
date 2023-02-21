import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useAuth } from 'hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { findWithCollectionName } from 'apis/findWithCollectionName';
import { updateLike, updateMyProject } from 'apis/postDetail';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RiShareBoxLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';

const ViewsToShare = ({ pid, projectData }: any) => {
  const { view, like } = projectData;
  const { uid } = useAuth();
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
  );

  useEffect(() => {
    setIsLike(myProjectData?.likedProjects?.includes(pid)); //현재 사용자가 좋아요를 눌렀는지 확인하기 위해
  }, [myProjectData]);

  useEffect(() => {
    likeMutate; // 좋아요 수 변경
    likedProjectMutate; // likedProjects에 pid 추가/삭제
  }, [isLike]);

  //좋아요 기능
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLike(!isLike);
    if (isLike === true) {
      // 클릭했을 때 true인 경우
      setCountLike(countLike - 1);
    } else if (isLike === false) {
      //클릭했을 때 false인 경우
      setCountLike(countLike + 1);
    }
  };

  const [share, setShare] = useState(false);

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShare(!share);
  };

  // console.log(projectData);
  return (
    <>
      <ViewsToShareContainer>
        <Wrapper>
          <ViewsText> 조회</ViewsText>
          <ViewsText> {view}</ViewsText>
        </Wrapper>
        <LikeAndShareWrapper
          onClick={(e) => {
            handleLike(e);
          }}
        >
          <Wrapper>
            {isLike ? (
              <AiFillHeart size="1rem" color={`${COLORS.pink}`} />
            ) : (
              <AiOutlineHeart size="1rem" color={`${COLORS.gray750}`} />
            )}
          </Wrapper>
          <ClickText> 관심 {countLike ?? ' 0'}</ClickText>
        </LikeAndShareWrapper>
        <LikeAndShareWrapper onClick={(e) => handleShareButtonClick(e)}>
          <RiShareBoxLine />
          <ClickText>공유</ClickText>
        </LikeAndShareWrapper>
      </ViewsToShareContainer>
    </>
  );
};

export default ViewsToShare;

const ViewsToShareContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 16px;
  padding: 0 20px;
  gap: 12px;
  font-size: 12px;
  color: ${COLORS.gray800};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3px;
`;
const LikeAndShareWrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3px;
`;

const ViewsText = styled.p``;

const ClickText = styled.p`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
