import { firestore } from 'apis/firebaseService';
import { updateDoc, doc } from 'firebase/firestore';
import { useToastPopup, useGlobalModal, useAuth } from 'hooks';

// 페이지 2 : 기술스택 선택
const page = 2;

const useSetSkills = (skills: {
  plannerStack: string[];
  designerStack: string[];
  developerStack: string[];
}) => {
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();
  const { openModal } = useGlobalModal();
  const { uid } = useAuth();

  // 기술스택 선택 유효성 검사
  const checkValidation = () => {
    if (
      skills.plannerStack.length === 0 &&
      skills.designerStack.length === 0 &&
      skills.developerStack.length === 0
    ) {
      handleToastPopup('기술스택을 선택해주세요.');
      return false;
    }
    return true;
  };

  const handleConfirmButtonClick = async () => {
    if (!uid) return;
    if (!checkValidation()) return;
    await updateDoc(doc(firestore, `users/${uid}`), {
      ...skills,
    });
    openModal('login', page + 1);
  };

  return { showToast, ToastMessage, handleConfirmButtonClick };
};

export default useSetSkills;
