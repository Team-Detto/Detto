import { useNavigate } from 'react-router-dom';
import Views from './Views';
import Likes from './Likes';
import Share from './Share';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';
import { logEvent } from 'utils/amplitude';

const WriterToShareArea = ({ pid, userData, projectData }: any) => {
  const { uid, title, content, view, like } = projectData;
  const navigate = useNavigate();

  return (
    <WriterToShareContainer>
      <WriterWrapper>
        <WriterProfileImg
          src={userData?.photoURL}
          onClick={() => {
            navigate(`/profile/${uid}`);
            logEvent('Button Click', {
              from: `project_detail`, //pahtname으로 설정 시 이동한 페이지로 인식해서 수정
              to: 'profile',
              name: 'profile',
            });
          }} //작성자 공개 프로필 페이지로 이동
          referrerPolicy="no-referrer"
        />
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
  position: relative;
`;

const WriterProfileImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const WriterNickname = styled.p`
  font-size: 1.125rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;
