import React from 'react';
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useIsLogin } from 'hooks';
import Root from 'pages/Root';

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<ErrorPage />}>
      <Route path="/" element={<MainComponentPage />} />
      <Route
        path="/mypage"
        element={
          useIsLogin() ? <MyPageComonentPage /> : <Navigate to="/" replace />
        }
      />
      <Route path="/findproject" element={<FindProjectComponentPage />} />
      <Route path="/project/:id" element={<ProjectDetailComponentPage />} />
      <Route
        path="/project/write"
        element={
          useIsLogin() ? (
            <ProjectWriteComponentPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/project/write/:id"
        element={
          useIsLogin() ? (
            <ProjectEditComponentPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/profile/:id" element={<PublicProfileComponentPage />} />
    </Route>,
  ),
);

export default router;
