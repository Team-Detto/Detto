import { firestorage } from './firebaseService';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const firebaseImageUploadRequest = async (image: any) => {
  const sumnailImgRef = ref(firestorage, `sumnail/${image.name}`);
  await uploadBytes(sumnailImgRef, image);
  return await getDownloadURL(sumnailImgRef);
};
