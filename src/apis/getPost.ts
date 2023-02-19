import {
  getDoc,
  doc,
  query,
  collection,
  orderBy,
  getDocs,
  limit,
  where,
} from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';
import { getDate } from 'utils/date';

// 프로젝트 상세 조회
export const viewProject = async (params: any) => {
  const docRef = doc(firestore, 'post', params.id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// user 정보 조회
export const findUser = async (uid: string) => {
  const docRef = doc(firestore, 'user', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// 프로젝트 조회순으로 3개 조회
export const firebaseMostViewedProjectsRequest = async () => {
  const today = new Date().getMilliseconds();
  const docRef = collection(firestore, `post`);
  const q = query(
    docRef,
    where('isRecruiting', '==', true),
    where('deadline', '>=', today),
    orderBy('deadline', 'desc'),
    orderBy('view', 'desc'),
    limit(3),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return docs;
};

// 프로젝트 관심순으로 3개 조회
export const firebaseMostLikedProjectsRequest = async () => {
  const today = new Date().getMilliseconds();
  const docRef = collection(firestore, `post`);
  const q = query(
    docRef,
    where('isRecruiting', '==', true),
    where('deadline', '>=', today),
    orderBy('deadline', 'desc'),
    orderBy('like', 'desc'),
    limit(3),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return docs;
};
