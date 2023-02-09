import { useLoginModal } from 'hooks';
import { useEffect } from 'react';
import {
  LoginPage0,
  LoginPage1,
  LoginPage2,
  LoginPage3,
  LoginPage4,
} from 'components/login';

export default function LoginModal() {
  const {
    modal: { page },
    updateModalSize,
  } = useLoginModal();

  // 페이지에 따라 모달 크기 조절
  useEffect(() => {
    if (page === 0) {
      updateModalSize('41.0625rem', '31.4375rem');
    } else if (page === 1) updateModalSize('44.0625rem', '27.25rem');
  }, [page]);

  if (page === 0) return <LoginPage0 />;
  if (page === 1) return <LoginPage1 />;
  if (page === 2) return <LoginPage2 />;
  if (page === 3) return <LoginPage3 />;
  if (page === 4) return <LoginPage4 />;

  return <div>modal</div>;
}
