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

// Firebase의 사용자 컬렉션을 초기화하는 함수
const initializeUserCollections = (user: User) => {
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
    addDoc(collection(firestore, 'notes'), {
      senderUid: 'dyczcn8e6Ce1c7xq67EJHAfVsUK2',
      senderDisplayName: 'Hyojin',
      senderPhotoURL:
        'https://user-images.githubusercontent.com/88768022/219316199-185b6b96-f846-4754-90aa-4a5055ca1731.png',
      receiverUid: user.uid,
      receiverDisplayName: user.displayName || 'Anonymous',
      receiverPhotoURL: user.photoURL,
      date: Date.now(),
      title: 'Detto에 오신 것을 환영합니다 🎉',
      content:
        '프로젝트를 등록해 팀원을 모집하거나, 관심 있는 프로젝트에 지원해보세요!',
      isRead: false,
    }),
    setDoc(doc(firestore, 'notifications', user.uid), {}),
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
      if (additionalUserInfo?.isNewUser) {
        // 신규 유저일 경우, 유저 컬렉션에 데이터를 추가 후 다음 페이지로 이동
        await initializeUserCollections(user);
        openNextPage();
      } else {
        // 기존 유저일 경우, 모달 닫기
        closeModal();
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
