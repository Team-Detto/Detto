import { firestore } from 'apis/firebaseService';
import { updateDoc, doc } from 'firebase/firestore';
import { useToastPopup, useGlobalModal, useAuth } from 'hooks';
import { useState } from 'react';

// 페이지 1 : 포지션 선택
const page = 1;

const useSetPositions = () => {
  const [positions, setPositions] = useState<string[]>([]);
  const [career, setCareer] = useState<string>('');

  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  // 포지션 선택 토글
  const handleCheckPositions = (isChecked: boolean, pos: string) => {
    if (!isChecked) {
      setPositions(positions.filter((p) => p !== pos).sort());
    } else {
      setPositions([...positions, pos].sort());
    }
  };

  // 포지션 선택 유효성 검사
  const checkValidation = () => {
    if (positions.length === 0) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    if (career === '') {
      handleToastPopup('경력을 선택해주세요.');
      return false;
    }
    return true;
  };

  // 포지션 선택 완료
  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    if (!checkValidation()) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      positions,
      isJunior: career === 'junior',
    });
    openModal('login', page + 1);
  };

  return {
    showToast,
    ToastMessage,
    handleCheckPositions,
    setCareer,
    handleConfirmButtonClick,
  };
};

export default useSetPositions;
