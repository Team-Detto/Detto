import { useState } from 'react';
import { firestore } from 'apis/firebaseService';
import { useGlobalModal } from 'hooks';
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  User,
  FacebookAuthProvider,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const useSocialLogin = () => {
  const [overlay, setOverlay] = useState<boolean>(false);

  const { openModal, closeModal } = useGlobalModal();
  const openNextPage = () => openModal('login', 1);

  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  // 유저 컬렉션에 데이터를 추가하는 함수
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

  // provider를 인자로 받아 로그인을 처리하는 함수
  const signInWithPopupWithProvider = (
    provider: GithubAuthProvider | GoogleAuthProvider,
  ) => {
    setOverlay(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const additionalUserInfo = getAdditionalUserInfo(result);

        console.log('login sucess: ', user);
        if (additionalUserInfo?.isNewUser) {
          // 신규 유저일 경우, 유저 컬렉션에 데이터를 추가 후 다음 페이지로 이동
          setUserCollection(user);
          openNextPage();
        } else {
          // 기존 유저일 경우, 모달 닫기
          closeModal();
        }
      })
      .catch((error) => console.error('error: ', error))
      .finally(() => setOverlay(false));
  };

  const handleGithubLogin = () => {
    signInWithPopupWithProvider(githubProvider);
  };

  const handleFacebookLogin = () => {
    signInWithPopupWithProvider(facebookProvider);
  };

  const handleGoogleLogin = () => {
    signInWithPopupWithProvider(googleProvider);
  };

  return { overlay, handleGithubLogin, handleFacebookLogin, handleGoogleLogin };
};

export default useSocialLogin;
