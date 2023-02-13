import { useGlobalModal } from 'hooks';
import { useRecoilValue } from 'recoil';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NoteMessage({ data }: any) {
  const { title, date, isRead, displayName } = data;

  const { openModal, openModalWithData } = useGlobalModal();

  const handleTitleClick = () => {
    openModalWithData('inbox', data);
  };

  return (
    <MessageContainer>
      <MessageTitleDiv isRead={isRead} onClick={handleTitleClick}>
        {title}
      </MessageTitleDiv>
      <MessageDateDiv>
        {displayName} | {date}
      </MessageDateDiv>
    </MessageContainer>
  );
}
