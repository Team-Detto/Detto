import MainBanner from 'components/main/banner/MainBanner';
import MainCalendar from 'components/main/Calendar/MainCalendar';
import WebContainer from 'components/common/WebContainer';
const MainPage = () => {
  return (
    <>
      <MainBanner />
      <WebContainer>
        <MainCalendar />
      </WebContainer>
    </>
  );
};

export default MainPage;
