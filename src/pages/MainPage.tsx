import MainBanner from 'components/main/banner/MainBanner';
import MainCalendar from 'components/main/calendar/MainCalendar';
import WebContainer from 'components/common/WebContainer';
import MainRecommendation from 'components/main/recommendation/MainRecommendation';
import MainFindUsers from 'components/main/findUsers/MainFindUsers';
const MainPage = () => {
  return (
    <>
      <MainBanner />
      <WebContainer>
        <MainCalendar />
        <MainRecommendation />
        <MainFindUsers />
      </WebContainer>
    </>
  );
};

export default MainPage;
