import { useNavigate } from 'react-router-dom';
import Views from './Views';
import Likes from './Likes';
import Share from './Share';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { BiLink } from 'react-icons/bi';
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

const WriterToShareArea = ({
  pid,
  share,
  userData,
  showToast,
  isCopyLink,
  projectData,
  ToastMessage,
  onShareButtonClickEvent,
  onCopyLinkButtonClickEvent,
}: any) => {
  const { uid, like, title, content, view } = projectData;
  const navigate = useNavigate();

  return (
    <WriterToShareContainer>
      <WriterWrapper>
        <WriterProfileImg
          src={userData?.photoURL}
          onClick={() => navigate(`/profile/${uid}`)} //작성자 공개 프로필 페이지로 이동
        />
        <WriterNickname>{userData?.displayName ?? `닉네임`}</WriterNickname>
      </WriterWrapper>
      <IconWrapper>
        <Views pid={pid} view={view} />
        <Likes pid={pid} like={like} />
        <Share
          title={title}
          content={content}
          onShareButtonClickEvent={onShareButtonClickEvent}
        />
        {share && (
          <ShareContainer>
            <FacebookShareButton url={window.location.href} title={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LineShareButton url={window.location.href} title={title}>
              <LineIcon size={32} round />
            </LineShareButton>
            <TwitterShareButton url={window.location.href} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <ShareLinkButton onClick={onCopyLinkButtonClickEvent}>
              <BiLink size={20} />
            </ShareLinkButton>
          </ShareContainer>
        )}
      </IconWrapper>
      {showToast && (
        <ValidationToastPopup message={ToastMessage} isCopy={isCopyLink} />
      )}
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
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

const WriterNickname = styled.p`
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
`;

const ShareContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 13rem;
  height: 3rem;

  top: 3rem;
  right: -5rem;

  background-color: ${COLORS.white};
  box-shadow: 0 0 10px ${COLORS.gray300};
  z-index: 10;
  border-radius: 15px;

  ::after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(244, 244, 244, 0);
    border-bottom-color: ${COLORS.white};
    border-width: 10px;
    margin-left: -10px;
  }
`;
const ShareLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: ${COLORS.gray300};
  margin-bottom: 0.2rem;
  cursor: pointer;

  svg {
    color: ${COLORS.white};
  }
`;
