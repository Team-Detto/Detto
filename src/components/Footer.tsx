import COLORS from 'assets/styles/colors';
import { Link } from 'react-router-dom';
import { useIsMobile } from 'hooks';
import styled from '@emotion/styled';
import MobileFooter from './MobileFooter';
import WebContainer from './common/WebContainer';
import { LogoBoxH1 } from './Header';
import iconGithub from 'assets/images/footer_github.png';
import iconGmail from 'assets/images/footer_gmail.png';

const Footer = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileFooter />;
  }

  return (
    <FooterContainer>
      <WebContainer>
        <FooterContentsWrapper>
          <ContentsBox>
            <LogoBox>
              <Link to={'/'}> Detto</Link>
            </LogoBox>
            <OurTeamText>
              함께 성장하는 시너지를 믿는 팀, <br />
              내일배움캠프 리액트 트랙
              <br /> 팀 디토입니다.
            </OurTeamText>
            <IconList>
              <IconItem />
              <IconItem />
              <IconItem />
            </IconList>
          </ContentsBox>
          <ContentsBox>
            <ContentsTitle>CONTACT</ContentsTitle>
            <ContentsList>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGithub} alt="깃허브" />
                </IconWrapper>
                <PageLink target={'_blank'} to={'https://github.com/su-no'}>
                  Hyojin
                </PageLink>
              </ContentItem>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGithub} alt="깃허브" />
                </IconWrapper>
                <PageLink target={'_blank'} to={'https://github.com/yujleee'}>
                  Yujeong
                </PageLink>
              </ContentItem>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGithub} alt="깃허브" />
                </IconWrapper>
                <PageLink
                  target={'_blank'}
                  to={'https://github.com/baesee0806'}
                >
                  baesee
                </PageLink>
              </ContentItem>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGithub} alt="깃허브" />
                </IconWrapper>
                <PageLink target={'_blank'} to={'https://github.com/vpvm96'}>
                  Leo
                </PageLink>
              </ContentItem>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGithub} alt="깃허브" />
                </IconWrapper>
                <PageLink target={'_blank'} to={'https://github.com/jeLee94'}>
                  JungEun
                </PageLink>
              </ContentItem>
              <ContentItem>
                <IconWrapper>
                  <IconGithub src={iconGmail} alt="비핸스" />
                </IconWrapper>
                <PageLink target={'_blank'} to={'mailto:coolhayoen@gmail.com'}>
                  Hayeon
                </PageLink>
              </ContentItem>
            </ContentsList>
          </ContentsBox>
          <ContentsBox>
            <ContentsTitle>FEEDBACK</ContentsTitle>
            <ContentsList>
              <ContentItem>
                <PageLink
                  target={'_blank'}
                  to={'https://forms.gle/56Q3PzjfhS6WzbxRA'}
                >
                  Google Form
                </PageLink>
              </ContentItem>
            </ContentsList>
          </ContentsBox>
          <ContentsBox>
            <ContentsTitle>CATEGORY</ContentsTitle>
            <ContentsList>
              <ContentItem>
                <PageLink to={'/findproject'} state={'planner'}>
                  Planning
                </PageLink>
              </ContentItem>
              <ContentItem>
                <PageLink to={'/findproject'} state={'designer'}>
                  Design
                </PageLink>
              </ContentItem>
              <ContentItem>
                <PageLink to={'/findproject'} state={'frontend'}>
                  Frontend
                </PageLink>
              </ContentItem>
              <ContentItem>
                <PageLink to={'/findproject'} state={'backend'}>
                  Backend
                </PageLink>
              </ContentItem>
            </ContentsList>
          </ContentsBox>
        </FooterContentsWrapper>
        <Copyright>@2023 All Rights Reserved</Copyright>
      </WebContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  height: 22.25rem;
  background-color: ${COLORS.gray50};
  padding: 4rem 0;
  position: relative;
  left: 0;
  bottom: 0;
`;

const FooterContentsWrapper = styled.div`
  display: flex;
  gap: 10rem;
`;

const Copyright = styled.p`
  font-size: 14px;
  line-height: 140%;
  color: ${COLORS.gray700};
  position: absolute;
  right: 0;
  bottom: 0.625rem;
`;

const ContentsBox = styled.div`
  max-width: 13.75rem;
  color: ${COLORS.gray750};
`;

const LogoBox = styled(LogoBoxH1)`
  margin-left: 0;
`;

export const OurTeamText = styled.p`
  margin: 1.125rem 0 2.5rem;
  font-size: 0.875rem;
  line-height: 160%;
  color: ${COLORS.gray750};
`;

const IconList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconItem = styled.li`
  display: block;
  width: 2rem;
  height: 2rem;

  &:last-of-type {
    margin-right: 1.25rem;
  }
`;

const ContentsTitle = styled.strong`
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.185em;
`;

const ContentsList = styled.ul`
  margin-top: 1.125rem;
`;

const ContentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
`;

const IconWrapper = styled.div`
  width: 1.125rem;
  height: 1.125rem;
`;

const IconGithub = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PageLink = styled(Link)`
  font-size: 0.875rem;

  &:hover {
    color: ${COLORS.gray850};
  }
`;
