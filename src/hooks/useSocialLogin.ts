import { firestore } from 'apis/firebaseService';
import { useGlobalModal } from 'hooks';
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const useSocialLogin = () => {
  const { openModal, closeModal } = useGlobalModal();
  const openNextPage = () => openModal('login', 1);

  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const signInWithPopupWithProvider = (
    provider: GithubAuthProvider | GoogleAuthProvider,
  ) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const additionalUserInfo = getAdditionalUserInfo(result);

        if (additionalUserInfo?.isNewUser) {
          setUserCollection(user);
          openNextPage();
        } else {
          closeModal();
        }
      })
      .catch((error) => {
        console.error('error: ', error);
      });
  };

  const handleGithubLogin = () => {
    signInWithPopupWithProvider(githubProvider);
  };

  const handleKakaoLogin = () => {
    console.log('kakao login');
  };

  const handleGoogleLogin = () => {
    signInWithPopupWithProvider(googleProvider);
  };

  const setUserCollection = async (user: User) => {
    await setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email, // github의 경우 이메일 공개 여부에 따라 null로 할당되기도 함.
      photoURL: user.photoURL,
      designerStack: [],
      developerStack: [],
      plannerStack: [],
      positions: [],
      isJunior: false,
    });
  };
  return { handleGithubLogin, handleKakaoLogin, handleGoogleLogin };
};

export default useSocialLogin;
