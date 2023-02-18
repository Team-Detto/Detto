import { Global } from '@emotion/react';
import { authService } from 'apis/firebaseService';
import reset from 'assets/styles/globalStyled';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/Router';

function App() {
  authService.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email, // github의 경우 이메일 공개 여부에 따라 null로 할당되기도 함.
          photoURL: user.photoURL,
        }),
      );
    }
  });

  return (
    <>
      <Global styles={reset} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
