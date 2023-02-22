import { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
import { deleteProfileImg, uploadProfileImg } from 'apis/mypageUsers';

const useProfileImage = (uid: string, photoURL?: string) => {
  const [profileImg, setProfileImg] = useState<string>('');

  // input type="file"의 onChange 이벤트 핸들러
  const handleProfileImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);

    const resizedImage = await resizeFile(file);

    // 이미지를 스토리지에 업로드 후 반환받은 이미지 url을 상태(profileImg)로 저장
    uploadProfileImg(file, uid).then((res) =>
      setProfileImg(resizedImage as string),
    );
  };

  // 이미지 삭제 이벤트 핸들러
  const handleProfileImageDelete = () => {
    deleteProfileImg(uid);
    setProfileImg('');
  };

  useEffect(() => {
    setProfileImg(photoURL || '');
  }, [photoURL]);

  return {
    handleProfileImageChange,
    profileImg,
    setProfileImg,
    handleProfileImageDelete,
  };
};

export default useProfileImage;

const resizeFile = (file: File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      200,
      'JPEG',
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      'base64',
    );
  });
