import styled from '@emotion/styled';
import { RiShareBoxLine } from 'react-icons/ri';

const Share = ({ title, content }: any) => {
  //공유 기능
  const handleShare = (event: React.MouseEvent) => {
    event.preventDefault();
    navigator.share({
      title: title,
      text: content,
      url: window.location.href,
    });
  };
  return (
    <IconButton
      onClick={(event) => {
        handleShare(event);
      }}
    >
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
