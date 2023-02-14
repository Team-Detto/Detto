import { useGlobalModal } from 'hooks';
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';

const useSocialLogin = () => {
  const { openModal, closeModal } = useGlobalModal();
  const openNextPage = () => openModal('login', 1);

  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();

  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.uid);

        const additionalUserInfo = getAdditionalUserInfo(result);

        if (additionalUserInfo?.isNewUser) {
          openNextPage();
        } else {
          closeModal();
        }
      })
      .catch((error) => {
        console.error('error: ', error);
      });
  };

  const handleKakaoLogin = () => {
    console.log('kakao login');
  };

  const handleGoogleLogin = () => {
    console.log('google login');
  };

  return { handleGithubLogin, handleKakaoLogin, handleGoogleLogin };
};

export default useSocialLogin;
