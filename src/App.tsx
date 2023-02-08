import { Global } from '@emotion/react';
import reset from 'assets/styles/globalStyled';
import Router from 'routes/Router';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Router />
    </>
  );
}

export default App;
