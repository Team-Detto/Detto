import { useState } from 'react';
import { useIsMobile, useToastPopup } from 'hooks';
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
import ValidationToastPopup from 'components/common/ValidationToastPopup';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import kakaoIcon from 'assets/images/share_kakao.png';

interface ShareProps {
  title: string;
  content: string;
  thumbnail: string;
}

const Share = ({ title, content, thumbnail }: ShareProps) => {
  const [share, setShare] = useState(false);
  const [isCopyLink, setIsCopyLink] = useState(false);
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const currentURL = window.location.href;

  const handleShareButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShare(!share);
    amplitudeToNoneButtonClick('share');
  };

  const handleCopyLinkButtonClick = () => {
    navigator.clipboard.writeText(currentURL);
    handleToastPopup('링크가 복사되었습니다.');
    setIsCopyLink(true);
    amplitudeToNoneButtonClick('share_link');
  };

  const handleShareKakaoClick = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: title,
          description: content.substring(0, 30) + '...',
          imageUrl:
            thumbnail ??
            'https://lh3.googleusercontent.com/fife/AMPSemfi7A0nS-mHelGbgqZHweznpRIzKWzHEpYdlyAEUnsHoivG5A4QAb7i2MlKxSDNcbfe4eWQ1l0EaW3dK_NKNjU431vs7xSJ3yxLfCrCk7OXLDbjbwtVMeXE5V_e3oes5LnHMbx6ONlEqRRvef45Se2spOEd3-N8vjA0pKNR_Hr9LLOICKKylaKd-gYPYip5JFKohUD0jXH1VDf5VajWfjxJL7pZS5Y5LXKP_WV2J83Iz_WNr3lhEr6C2041Cy8D19ySkzbMSMv7aLfjueyBK60lPhDlnvJAYe1CrntM2mj4g8G5S4fn_7gupeKfUoLLurKghmqTstgwQONUqqBWfMJBX3CpWuwyETzEVVMn_kZDC7ND0aZLbd0WL75U6YgKUcewgT8pelz0hqBzteRDdhLe4kbuQ9qtPPhdZxLD1XFsbtJT7ZUwyfBRBDvwW087f6nsVi6qlpoDEAWZbwXTcbS9LXBA3rBpdPxGrL3ISW79IKryE_44GKNSCHrBuw9wXgPoPJp7EFJHRsXr2LWZJoElSPC8oZd_ybJYkjBkBIzDRmgkqjHgK1rbKzhxfY-AKeoOAETpyJ0r5wqnZB_4YQ55FvH_c5h-d0nHvc41M9nOwyMSSzKAQrSfXWmOJcZHVMhsOfcU9bp_WunhakjX4OYkWi9X_rKM6bHpG6HCAU5z048IHljoSERKB9M9Gczbm91p42zBSs3G3iRg3zyRVnXALiYxn_OSgiqxgCDkikWI8bbMCti_wU7iqJZYYGumY5zqnKFwaS1T0RFCsK_epw4KvAy6MnpK20d1Z4-f4nRs_n1aT0OG4g46GUpwQOkI5PZeiyUK41CBwFwzPrd-Dxqh4ZI8-W-2UwS8YWwExGFgTn1Aivrc45I9mV8qoAoYWJqAAyaqSv4rwzjtEL514SlsT-XtTeeZhL5Bnxw1OdQvAQfa2IRDCmcsp_CTnrQR5ECeLKw3MArxERBjAwEX6Uvqfy9077x0fZOnrbSf5PpKRFOoEFl4oacs0WXKc7pOTfOK2f2LZ8PQGm3EPWqkWEabc9FrKCOJCHDXCzBYcnVR-kKTVBFRQUO08-z9Gyu2s456TAlItYjSjOtkv9IRxs24pjIWwzQvnnVizw2zvdEcP0ct0WVoYI7-N1bKcgZQslO5XPCvNbUb965qzFF35rA_u4fCf-mNEZAvntmwgs1oFBC6tGxDYnbet7pv-rPnKPPgg2qLX47us1jmdyqRyEPZkjyLX-XYcLx8dCwSVAu89EnYthO86Kxf7ZafFHpQ_xepf0iYOvm0QYx8GsZ-sDOlh_Du-EG9Trkwr5FevXKdsFRZNo-Jc7z1HYwrl1FjWiav0TzOa1SWnPtykkw2C5GkJzs8WD7O38USNdJWfKkC6nWE-gMLCzMwACBPzX_54azf6DXU2WYvsL7z-R5ipH966j7G5kZ4_dgsC57rYGOQVIHw5xElW7vvgNZvuj230OCSIZZwOmySe6pILGkbdVpJacmKYsacCZ1QiK8M1G0zkJUmgnT0St-jXHbpkDsoHLNQ4EkW8fl1AslxIUQATgnj6BXzENSJ5Q29vz_0PlpkTf8K1obConZoU1JxPa9l=w2880-h1528',
          link: {
            mobileWebUrl: currentURL,
            webUrl: currentURL,
          },
        },
      });
    }

    amplitudeToNoneButtonClick('share_kakao');
  };

  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <IconContainer
          onClick={(e) => handleShareButtonClick(e)}
          isMobile={isMobile}
        >
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
              <ShareKaKaoArea isMobile={isMobile}>
                <ShareKaKaoBtn
                  isMobile={isMobile}
                  onClick={handleShareKakaoClick}
                >
                  <KaKaoIconImg src={kakaoIcon} />
                </ShareKaKaoBtn>
              </ShareKaKaoArea>
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
              <ShareKaKaoArea>
                <ShareKaKaoBtn onClick={handleShareKakaoClick}>
                  <KaKaoIconImg src={kakaoIcon} />
                </ShareKaKaoBtn>
              </ShareKaKaoArea>
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

const IconContainer = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: ${({ isMobile }) => (isMobile ? 'relative' : '')};

  gap: 0.5rem;
`;

const ShareBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
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

  top: 2rem;
  left: -3rem;
  z-index: 10;
  background-color: ${COLORS.white};
  box-shadow: 0 0 0.625rem ${COLORS.gray300};
  padding-top: 0.25rem;

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

const ShareKaKaoArea = styled.div<{ isMobile?: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '1.75rem' : '2rem')};
  height: 2.3125rem;
  margin-top: ${({ isMobile }) => (isMobile ? '0.3rem' : '0')};
`;

const ShareKaKaoBtn = styled.button<{ isMobile?: boolean }>`
  display: block;
  width: ${({ isMobile }) => (isMobile ? '1.75rem' : '2rem')};
  height: ${({ isMobile }) => (isMobile ? '1.75rem' : '2rem')};
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const KaKaoIconImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
