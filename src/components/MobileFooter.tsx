import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { MdFeedback } from 'react-icons/md';
import COLORS from 'assets/styles/colors';
import iconGithub from 'assets/images/footer_github.png';
import iconGmail from 'assets/images/footer_gmail.png';

interface FooterProps {
  isFindProject: boolean;
}

const MobileFooter = ({ isFindProject }: FooterProps) => {
  return (
    <FooterContainer isFindProject={isFindProject}>
      <Logo>Detto</Logo>
      <ContentWrapper>
        <ContactList>
          <ContactBox>
            <ContentItem>
              <IconFeedback />
              <PageLink
                target={'_blank'}
                to={'https://forms.gle/56Q3PzjfhS6WzbxRA'}
              >
                Feedback
              </PageLink>
            </ContentItem>
          </ContactBox>
          <ContactBox>
            <ContactTitle>Contact</ContactTitle>
          </ContactBox>
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
            <PageLink target={'_blank'} to={'https://github.com/baesee0806'}>
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
            <PageLink target={'_blank'} to={'mailto:coolhayeon@gmail.com'}>
              Hayeon
            </PageLink>
          </ContentItem>
        </ContactList>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default MobileFooter;

const FooterContainer = styled.footer<{ isFindProject: boolean }>`
  width: 100%;
  height: 12rem;
  background-color: ${COLORS.gray50};
  /* margin-top: 5rem; */
  padding: 1rem 1.5rem;
  position: relative;
  left: 0;
  bottom: 0;
  display: ${({ isFindProject }) => (isFindProject ? 'none' : 'block')};
`;

const Logo = styled.h2`
  font-size: 1.25rem;
  font-weight: 900;
  color: ${COLORS.violetB500};
  margin-bottom: 1rem;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContactTitle = styled.strong`
  font-size: 0.75rem;
  color: ${COLORS.gray750};
  margin: 0 0.625rem;
`;

const ContactBox = styled.div`
  display: flex;
  height: 1rem;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0 1rem;
`;

const ContactList = styled.ul`
  width: 16.875rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const ContentItem = styled.li`
  min-width: 4.125rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
  color: ${COLORS.gray600};
  &:not(:nth-of-type(3n)) {
    margin-right: 0.875rem;
  }
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

const IconFeedback = styled(MdFeedback)`
  margin-top: 4px;
  font-size: 1rem;
  color: ${COLORS.gray750};
`;

const PageLink = styled(Link)`
  font-size: 0.75rem;

  &:hover {
    color: ${COLORS.gray700};
  }
`;
