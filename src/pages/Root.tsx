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
      <Header />
      <Suspense fallback={<LoadingPage />}>
        <ScrollToTop />
        <ScrollToTopButton />
        <ModalContainer />
        <Outlet />
      </Suspense>
    </>
  );
}
