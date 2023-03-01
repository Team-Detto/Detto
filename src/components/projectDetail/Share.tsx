import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { RiShareBoxLine } from 'react-icons/ri';
import { BiLink } from 'react-icons/bi';
import {
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import { useState } from 'react';
import { useIsMobile, useToastPopup } from 'hooks';
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';

const Share = ({ title }: any) => {
  const [share, setShare] = useState(false);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShare(!share);
    amplitudeToNoneButtonClick('share');
  };

  const handleCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    handleToastPopup('링크가 복사되었습니다.');
    setIsCopyLink(true);
    amplitudeToNoneButtonClick('share_link');
  };

  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <>
        <IconContainer onClick={(e) => handleShareButtonClick(e)}>
          <ShareBox>
            <RiShareBoxLine />
            공유
          </ShareBox>
          {share && (
            <MobileShareContainer>
              <FacebookShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_facebook')}
              >
                <FacebookIcon size={28} round />
              </FacebookShareButton>
              <LineShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_line')}
              >
                <LineIcon size={28} round />
              </LineShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_twitter')}
              >
                <TwitterIcon size={28} round />
              </TwitterShareButton>
              <ShareLinkButton
                onClick={() => {
                  handleCopyLinkButtonClick();
                }}
              >
                <BiLink size={18} />
              </ShareLinkButton>
            </MobileShareContainer>
          )}
        </IconContainer>
        {showToast && (
          <ValidationToastPopup message={ToastMessage} isCopy={isCopyLink} />
        )}
      </>
    );
  } else {
    return (
      <>
        <IconContainer onClick={(e) => handleShareButtonClick(e)}>
          <ShareBox>
            <RiShareBoxLine />
            공유
          </ShareBox>
          {share && (
            <ShareContainer>
              <FacebookShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_facebook')}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <LineShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_line')}
              >
                <LineIcon size={32} round />
              </LineShareButton>
              <TwitterShareButton
                url={window.location.href}
                title={title}
                onClick={() => amplitudeToNoneButtonClick('share_twitter')}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <ShareLinkButton onClick={handleCopyLinkButtonClick}>
                <BiLink size={20} />
              </ShareLinkButton>
            </ShareContainer>
          )}
        </IconContainer>
        {showToast && (
          <ValidationToastPopup message={ToastMessage} isCopy={isCopyLink} />
        )}
      </>
    );
  }
};

export default Share;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;
`;

const ShareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ShareLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background-color: ${COLORS.gray300};
  margin-bottom: 0.2rem;
  cursor: pointer;

  svg {
    color: ${COLORS.white};
  }
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
  box-shadow: 0 0 0.625rem ${COLORS.gray300};
  z-index: 10;
  border-radius: 0.9375rem;

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
    border-width: 0.625rem;
    margin-left: -0.625rem;
  }
`;

const MobileShareContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 10rem;
  height: 2.5rem;

  top: 23rem;
  left: 18%;
  z-index: 10;
  background-color: ${COLORS.white};
  box-shadow: 0 0 0.625rem ${COLORS.gray300};

  border-radius: 0.9375rem;

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
    border-width: 0.625rem;
    margin-left: -0.625rem;
  }
`;
