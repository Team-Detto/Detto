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
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
// Firebase의 사용자 컬렉션을 초기화하는 함수
const initializeUserCollections = (user: User) => {
  const date = Date.now();
  return Promise.all([
    setDoc(doc(firestore, 'users', user.uid), {
      uid: user.uid,
      displayName: user.displayName || 'Anonymous',
      email: user.email || '', // github의 경우 이메일 공개 여부에 따라 null로 할당되기도 함.
      photoURL: user.photoURL,
      designerStack: [],
      developerStack: [],
      plannerStack: [],
      positions: [],
      isJunior: false,
    }),
    setDoc(doc(firestore, 'myprojects', user.uid), {
      likedProjects: [],
      appliedProjects: [],
      postedProjects: [],
      currentProjects: [],
    }),
    addDoc(collection(firestore, 'notifications'), {
      uid: user.uid,
      date,
      title: 'Detto에 오신 것을 환영합니다 🎉',
      isRead: false,
    }),
  ]);
};

const useSocialLogin = () => {
  const [overlay, setOverlay] = useState<boolean>(false);

  const { openModal, closeModal } = useGlobalModal();
  const openNextPage = () => openModal('login', 1);

  const auth = getAuth();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  const location = useLocation();
  const navigate = useNavigate();

  // provider를 인자로 받아 로그인을 처리하는 함수
  const signInWithPopupWithProvider = async (
    provider: GithubAuthProvider | GoogleAuthProvider,
  ) => {
    setOverlay(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalUserInfo = getAdditionalUserInfo(result);

      console.log('login sucess: ', user);
      navigate(location.pathname);
      if (additionalUserInfo?.isNewUser) {
        // 신규 유저일 경우, 유저 컬렉션에 데이터를 추가 후 다음 페이지로 이동
        await initializeUserCollections(user);
        openNextPage();
      } else {
        // 기존 유저일 경우, 모달 닫기
        closeModal();
        window.location.reload();
      }
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setOverlay(false);
    }
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
