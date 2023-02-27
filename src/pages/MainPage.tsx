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
const MainPage = () => {
  const Mobile = useIsMobile();
  return (
    <>
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
