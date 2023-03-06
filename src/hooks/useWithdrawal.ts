import { authService, firestore } from 'apis/firebaseService';
import { deleteUser } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import useHeader from './useHeader';
import useModal from './useModal';

const useWithdrawal = () => {
  const { isOpen, handleModalStateChange } = useModal(false);
  const { withdrawalAccount } = useHeader();

  // 회원 탈퇴 함수
  const handleWithdrawalClick = async () => {
    const currentUser = authService.currentUser;

    if (!currentUser) {
      return;
    }

    // 회원 탈퇴 시 users 컬렉션의 isActive 필드를 false로 변경
    await updateDoc(doc(firestore, 'users', currentUser.uid), {
      isActive: false,
    });
    deleteUser(currentUser).catch((err) => console.error(err));
    handleModalStateChange();
    withdrawalAccount();
  };

  return { isOpen, handleModalStateChange, handleWithdrawalClick };
};

export default useWithdrawal;
