import styled from '@emotion/styled';
import Views from './Views';
import Likes from './Likes';
import Share from './Share';

const WriterToShareArea = ({ projectData, pid, userData }: any) => {
  const { uid, like, title, content, view } = projectData;

  return (
    <WriterToShareContainer>
      <WriterWrapper>
        <WriterProfileImg src={userData?.photoURL} />
        <WriterNickname>{userData?.displayName ?? `닉네임`}</WriterNickname>
      </WriterWrapper>
      <IconWrapper>
        <Views pid={pid} view={view} />
        <Likes pid={pid} like={like} />
        <Share title={title} content={content} />
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

const WriterProfileImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const WriterNickname = styled.p`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
