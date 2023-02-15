interface LocalStorageUser {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}
/**
 * 로컬 스토리지에 저장된 사용자 정보를 반환합니다.
 * @returns {LocalStorageUser}
 */
const useAuth = (): LocalStorageUser => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return user;
};

export default useAuth;
