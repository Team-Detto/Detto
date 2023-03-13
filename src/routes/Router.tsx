import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { useIsLogin } from 'hooks';
import Root from 'pages/Root';
import { lazy } from 'react';

const MainComponentPage = lazy(() => import('pages/MainPage'));
const MyPageComponentPage = lazy(() => import('pages/MyPage'));
const FindProjectComponentPage = lazy(() => import('pages/FindProjectPage'));
const ProjectDetailComponentPage = lazy(
  () => import('pages/ProjectDetailPage'),
);
const ProjectWriteComponentPage = lazy(() => import('pages/ProjectWritePage'));
const ProjectEditComponentPage = lazy(() => import('pages/ProjectEditPage'));
const PublicProfileComponentPage = lazy(
  () => import('pages/PublicProfilePage'),
);
const ErrorPage = lazy(() => import('pages/ErrorPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />}>
      <Route path="*" element={<ErrorPage />} />
      <Route
        path="/"
        element={<MainComponentPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/mypage"
        element={
          useIsLogin() ? <MyPageComponentPage /> : <Navigate to="/" replace />
        }
        errorElement={<ErrorPage />}
      />
      <Route
        path="/findproject"
        element={<FindProjectComponentPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/project/:id"
        element={<ProjectDetailComponentPage />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/project/write"
        element={
          useIsLogin() ? (
            <ProjectWriteComponentPage />
          ) : (
            <Navigate to="/" replace />
          )
        }
        errorElement={<ErrorPage />}
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
        errorElement={<ErrorPage />}
      />
      <Route
        path="/profile/:id"
        element={<PublicProfileComponentPage />}
        errorElement={<ErrorPage />}
      />
    </Route>,
  ),
);

export default router;
