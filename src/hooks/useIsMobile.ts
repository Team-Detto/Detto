import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  return useMediaQuery({ query: '(max-width: 500px)' });
};

export default useIsMobile;
