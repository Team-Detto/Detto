import MainBanner from 'components/main/banner/MainBanner';
import MainCalendar from 'components/main/Calendar/MainCalendar';
import WebContainer from 'components/common/WebContainer';
import MainRecommendation from 'components/main/recommendation/MainRecommendation';
import MainFindUsers from 'components/main/findUsers/MainFindUsers';
import useIsMobile from 'hooks/useIsMobile';
import MobileMainBanner from 'components/main/banner/MobileMainBanner';
import styled from '@emotion/styled';
import MobileMainRecommendation from 'components/main/recommendation/MobileMainRecommendation';
import MobileMainFindUsers from 'components/main/findUsers/MobileMainFindUsers';
import { Helmet } from 'react-helmet-async';
import mobileFirestBanner from 'assets/images/mobileFirstBanner.png';
const MainPage = () => {
  const Mobile = useIsMobile();
  return (
    <>
      <Helmet>
        <title>Detto</title>
        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />

        <meta property="og:url" content="https://detto.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Detto" />
        <meta
          property="og:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta property="og:image" content={mobileFirestBanner} />
        <meta property="og:site_name" content="Detto" />

        <meta property="twitter:url" content="https://detto.vercel.app/" />
        <meta name="twitter:title" content="Detto" />
        <meta name="twitter:image" content={mobileFirestBanner} />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="twitter:image" content={mobileFirestBanner} />
      </Helmet>
      {Mobile ? <MobileMainBanner /> : <MainBanner />}
      {/* <MainBanner /> */}
      {Mobile ? (
        <MobileContainer>
          <MobileMainRecommendation />
          <MobileMainFindUsers />
        </MobileContainer>
      ) : (
        <WebContainer>
          <MainCalendar />
          <MainRecommendation />
          <MainFindUsers />
        </WebContainer>
      )}
    </>
  );
};
const MobileContainer = styled.div`
  width: 100%;
  padding: 0 1.25rem 5rem 1.25rem;
`;
export default MainPage;

console.log(
  `
    %cDevelop Together, Grow Together %c
██████╗ ███████╗████████╗████████╗ ██████╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔═══██╗
██║  ██║█████╗     ██║      ██║   ██║   ██║
██║  ██║██╔══╝     ██║      ██║   ██║   ██║
██████╔╝███████╗   ██║      ██║   ╚██████╔╝
╚═════╝ ╚══════╝   ╚═╝      ╚═╝    ╚═════╝
%c `,
  'color:#704adb; line-height: 100px; font-size: 12px; font-weight: bold; font-family: "Noto Sans KR", sans-serif; ',
  'color:#6f64f2',
  'line-height:100px',
);
