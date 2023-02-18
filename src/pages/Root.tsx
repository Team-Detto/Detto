import ModalContainer from 'components/common/modal/ModalContainer';
import ScrollToTop from 'components/common/scrollToTop';
import Header from 'components/Header';
import ScrollToTopButton from 'components/ScrollToTopButton';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingPage from './LoadingPage';

export default function Root() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Header />
      <ModalContainer />
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </>
  );
}
