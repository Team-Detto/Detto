import MainBanner from 'components/main/banner/MainBanner';
import MainCalendar from 'components/main/Calendar/MainCalendar';
import WebContainer from 'components/common/WebContainer';
import MainRecommendation from 'components/main/recommendation/MainRecommendation';
const MainPage = () => {
  return (
    <>
      <MainBanner />
      <WebContainer>
        <MainCalendar />
        <MainRecommendation />
      </WebContainer>
    </>
  );
};

export default MainPage;
