import { firestore } from 'apis/firebaseService';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  increment,
  getDoc,
} from 'firebase/firestore';
import { firebaseImageUploadRequest } from './imageService';
import { WriteType } from 'types/write/writeType';

export const firebaseCreateProjectRequest = async (
  formData: WriteType.WriteFormType,
  markdownText: string,
  image: any,
  uid: string,
) => {
  try {
    const thumbnailUrl = image ? await firebaseImageUploadRequest(image) : null;

    const postDoc = await addDoc(collection(firestore, 'post'), {
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: new Date(formData.endDate).getTime(),
      deadline: new Date(formData.deadline).setHours(23, 59),
      content: markdownText,
      thumbnail: thumbnailUrl,
      view: 0,
      like: 0,
      createdAt: Date.now(),
      isRecruiting: true,
      applicants: {},
      uid,
    });

    await updateDoc(doc(firestore, 'myprojects', uid), {
      postedProjects: arrayUnion(postDoc.id),
    });

    return postDoc.id;
  } catch (e) {
    console.error(e);
  }
};

// firebase post 데이터 가져오기
export const firebaseGetProjectDataRequest = (setProjectData: any) => {
  const q = query(collection(firestore, 'post'), orderBy('createdAt', 'desc'));

  onSnapshot(q, (querySnapshot) => {
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setProjectData(data);
  });
};

export const firebaseInfinityScrollProjectDataRequest = async (
  setProjectData: any,
  lastVisible: any,
  setLastVisible: any,
) => {
  let q;
  if (lastVisible === -1) {
    return;
  } else if (lastVisible) {
    q = query(
      collection(firestore, 'post'),
      orderBy('createdAt', 'desc'),
      limit(9),
      startAfter(lastVisible),
    );
  } else {
    q = query(
      collection(firestore, 'post'),
      orderBy('createdAt', 'desc'),
      limit(15),
    );
  }

  await getDocs(q).then((querySnapshot) => {
    setProjectData((prev: any) => {
      const arr = [...prev];
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), id: doc.id });
      });
      return arr;
    });
    if (querySnapshot.docs.length === 0) {
      setLastVisible(-1);
    } else {
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    }
  });
};

export const firebaseEditProjectRequest = async (
  id: string,
  editFormData: any,
  markdownText: string,
  image: any,
) => {
  try {
    const thumbnailUrl = await firebaseImageUploadRequest(image);
    await updateDoc(doc(firestore, 'post', id), {
      ...editFormData,
      content: markdownText,
      thumbnail: thumbnailUrl === null ? editFormData.thumbnail : thumbnailUrl,
      startDate: new Date(editFormData.startDate).getTime(),
      endDate: new Date(editFormData.endDate).getTime(),
      deadline: new Date(editFormData.deadline).setHours(23, 59),
    });
  } catch (e) {
    console.error(e);
  }
};

export const firebaseLikeProjectUpdateRequest = async (
  id: string,
  uid: string,
) => {
  try {
    const postRef = doc(firestore, 'post', id);
    const projectsRef = doc(firestore, 'myprojects', uid);
    const snapshot = await getDoc(projectsRef);
    const duplicate = snapshot.data()?.likedProjects?.includes(id);
    if (duplicate) {
      await updateDoc(postRef, { like: increment(-1) });
      await updateDoc(projectsRef, { likedProjects: arrayRemove(id) });
    } else {
      await updateDoc(postRef, { like: increment(1) });
      await updateDoc(projectsRef, { likedProjects: arrayUnion(id) });
    }
  } catch (e) {
    console.error(e);
  }
};
