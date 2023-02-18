import { firestorage } from './firebaseService';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const firebaseImageUploadRequest = async (image: any) => {
  if (image === undefined) {
    return null;
  }
  const thumbnailImgRef = ref(firestorage, `thumbnail/image${Date.now()}`);
  await uploadBytes(thumbnailImgRef, image);
  return await getDownloadURL(thumbnailImgRef);
};
