import { Global } from '@emotion/react';
import reset from 'assets/styles/globalStyled';
import MessageBox from 'components/popup/MessageBox';
import NotificationBox from 'components/popup/NotificationBox';
import Router from 'routes/Router';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Router />
      <NotificationBox />
      <MessageBox />
    </>
  );
}

export default App;
