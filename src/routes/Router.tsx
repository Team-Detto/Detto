import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';

const MainComponentPage = React.lazy(() => import('pages/MainPage'));
const MyPageComonentPage = React.lazy(() => import('pages/MyPage'));
const FindProjectComponentPage = React.lazy(
  () => import('pages/FindProjectPage'),
);
const ProjectDetailComponentPage = React.lazy(
  () => import('pages/ProjectDetailPage'),
);
const ProjectWriteComponentPage = React.lazy(
  () => import('pages/ProjectWritePage'),
);
const ProjectEditComponentPage = React.lazy(
  () => import('pages/ProjectEditPage'),
);
const PublicProfileComponentPage = React.lazy(
  () => import('pages/PublicProfilePage'),
);
const ErrorPage = React.lazy(() => import('pages/ErrorPage'));

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>...loading</div>}>
        <Routes>
          <Route path="/" element={<MainComponentPage />} />
          <Route path="/mypage" element={<MyPageComonentPage />} />
          <Route path="/findproject" element={<FindProjectComponentPage />} />
          <Route path="/project/:id" element={<ProjectDetailComponentPage />} />
          <Route
            path="/project/write"
            element={<ProjectWriteComponentPage />}
          />
          <Route
            path="/project/write/:id"
            element={<ProjectEditComponentPage />}
          />
          <Route path="/profile/:id" element={<PublicProfileComponentPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
