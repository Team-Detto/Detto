import styled from '@emotion/styled';
import NoteBox from './NoteBox';
import NotificationBox from './NotificationBox';

export default function PopupContainer() {
  return (
    <Container>
      <NotificationBox />
      <NoteBox />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
