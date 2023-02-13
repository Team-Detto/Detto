import styled from '@emotion/styled';
import { useGlobalModal } from 'hooks';
import { useEffect } from 'react';
import { getDate } from 'utils/date';
import CustomButton from './CustomButton';

const NoteModal = () => {
  const {
    modal: { data },
    updateModalSize,
  } = useGlobalModal();

  const { displayName, title, date, content, photoURL } = data;

  const handleReply = () => {
    console.log('답장하기');
  };

  useEffect(() => {
    updateModalSize('41.0625rem', '29.4375rem');
  }, []);

  return (
    <Container>
      <Header>
        <ProfileImage />
        <Title>{displayName}님께 받은 쪽지</Title>
        <Date>{getDate(date)}</Date>
      </Header>
      <Content>{content}</Content>
      <CustomButton label="답장하기" onClick={handleReply} />
    </Container>
  );
};

export default NoteModal;

const Container = styled.div``;

const Header = styled.div``;

const ProfileImage = styled.div``;

const Title = styled.div``;

const Date = styled.div``;

const Content = styled.div``;
