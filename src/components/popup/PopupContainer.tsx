import styled from '@emotion/styled';
import NoteBox from './NoteBox';
import NotificationBox from './NotificationBox';

export default function PopupContainer() {
  return (
    <Container>
      <NoteBox />
      <NotificationBox />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;
