import styled from '@emotion/styled';
import { RiShareBoxLine } from 'react-icons/ri';

const Share = ({ onShareButtonClickEvent }: any) => {
  return (
    <IconButton onClick={(e) => onShareButtonClickEvent(e)}>
      <RiShareBoxLine />
      공유
    </IconButton>
  );
};

export default Share;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
