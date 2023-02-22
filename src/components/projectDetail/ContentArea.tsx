import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

const ContentArea = ({ projectData }: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <RecruitContentsContainer>
      <ContentTitle>모집 안내</ContentTitle>
      <ContentWrapper>
        {isLoaded && (
          <Viewer
            initialValue={projectData?.content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          />
        )}
      </ContentWrapper>
    </RecruitContentsContainer>
  );
};

export default ContentArea;

const RecruitContentsContainer = styled.div`
  margin-top: 3.625rem;
`;

const ContentTitle = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  width: 73.75rem;
  min-height: 532px;
  height: 100%;
  margin-top: 1.6875rem;
  background-color: ${COLORS.white};
  padding: 2.5rem;
  font-size: 1.25rem;
  .toastui-editor-contents p {
    font-size: 1.2rem;
  }
  .toastui-editor-contents h1 {
    font-size: 2.4rem;
  }
  .toastui-editor-contents h2 {
    font-size: 2.1rem;
  }
  .toastui-editor-contents h3 {
    font-size: 1.9rem;
  }
  .toastui-editor-contents h4 {
    font-size: 1.7rem;
  }
  .toastui-editor-contents h5 {
    font-size: 1.5rem;
  }
  .toastui-editor-contents h6 {
    font-size: 1.3rem;
  }
`;
