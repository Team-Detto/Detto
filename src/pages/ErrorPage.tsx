import styled from '@emotion/styled';
import ErrorImg from 'assets/images/404ErrorImg.png';
import ErrorMessage from 'assets/images/404ErrorMessage.png';
import { Helmet } from 'react-helmet-async';

const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <title>Error - Detto</title>

        <meta
          name="description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Error - Detto" />
        <meta property="og:site_name" content="Detto" />
        <meta
          property="og:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta property="og:image" content={ErrorImg} />
        <meta property="og:url" content="https://detto.vercel.app/error" />

        <meta name="twitter:title" content="Error - Detto" />
        <meta
          name="twitter:description"
          content="개발자를 위한 사이드 프로젝트 팀 매칭 플랫폼, Detto (Develop Together)"
        />
        <meta name="twitter:image" content={ErrorImg} />

        <link rel="canonical" href="https://detto.vercel.app/error" />
      </Helmet>
      <Container>
        <Image src={ErrorImg} />
        <Message src={ErrorMessage} />
      </Container>
    </>
  );
};

export default ErrorPage;

const Container = styled.div`
  width: 1200px;
  height: 100vh;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 35.2931rem;
  height: 18.6563rem;
`;

const Message = styled.img`
  width: 483px;
  height: 100px;
`;
