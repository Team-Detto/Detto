import MainBanner from 'components/main/banner/MainBanner';
import MainCalendar from 'components/main/Calendar/MainCalendar';
import WebContainer from 'components/common/WebContainer';
import MainRecommendation from 'components/main/recommendation/MainRecommendation';
import MainFindUsers from 'components/main/findUsers/MainFindUsers';
import useIsMobile from 'hooks/useIsMobile';
import MobileMainBanner from 'components/main/banner/MobileMainBanner';
const MainPage = () => {
  const Mobile = useIsMobile();
  return (
    <>
      {Mobile ? <MobileMainBanner /> : <MainBanner />}
      {/* <MainBanner /> */}
      {Mobile ? null : (
        <WebContainer>
          <MainCalendar />
          <MainRecommendation />
          <MainFindUsers />
        </WebContainer>
      )}
      {/* <WebContainer>
        <MainCalendar />
        <MainRecommendation />
        <MainFindUsers />
      </WebContainer> */}
    </>
  );
};

export default MainPage;
