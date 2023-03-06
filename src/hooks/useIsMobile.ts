import { useMediaQuery } from 'react-responsive';

const useIsMobile = () => {
  return useMediaQuery({ query: '(max-width: 1199px)' });
};

export default useIsMobile;
