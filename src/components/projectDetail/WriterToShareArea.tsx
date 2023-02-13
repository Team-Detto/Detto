import styled from '@emotion/styled';
import { useState } from 'react';
import { RiHeartAddLine, RiHeartAddFill, RiShareBoxLine } from 'react-icons/ri';

const WriterToShareArea = ({ projectData, userData }: any) => {
  const [isLike, setIsLike] = useState<boolean>(false); //Todo: 관심버튼 클릭시 true/false로 변경해주기

  const handleLike = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLike(!isLike);
    console.log(isLike);
  };

  const handleShare = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.share({
      title: projectData?.title,
      text: projectData?.content,
      url: window.location.href,
    });
  };
  return (
    <WriterToShareContainer>
      <WriterWrapper>
        {/* 게시글 작성자 프로필 이미지/ Todo: 클릭시 공개프로필로 연결 */}
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
          관심 {projectData?.like ?? 0}
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
