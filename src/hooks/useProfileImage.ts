import { useState } from 'react';
import { uploadProfileImg } from 'apis/mypageUsers';

const useProfileImage = (uid: string) => {
  const [profileImg, setProfileImg] = useState<string>('');

  // input type="file"의 onChange 이벤트 핸들러
  const handleProfileImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);

    // 이미지를 스토리지에 업로드 후 반환받은 이미지 url을 상태(profileImg)로 저장
    uploadProfileImg(file, uid).then((res) => setProfileImg(res));
  };

  return { handleProfileImgChange, profileImg, setProfileImg };
};

export default useProfileImage;
