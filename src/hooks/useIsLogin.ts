import useAuth from './useAuth';

const useIsLogin = () => {
  const user = useAuth();
  if (!user) return false;
  if (Object.keys(user).length === 0) return false;
  return true;
};

export default useIsLogin;
