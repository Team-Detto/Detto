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
  min-height: 33.25rem;
  height: 100%;
  margin-top: 1.6875rem;
  background-color: ${COLORS.white};
  padding: 2.5rem;
  font-size: 1.25rem;
  .toastui-editor-contents {
    p {
      font-size: 1.2rem;
      line-height: 1.8rem;
      margin-bottom: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-top: 3rem;
      padding-bottom: 1rem;
      border-bottom: none;
    }

    h1 {
      font-size: 2.4rem;
    }
    h2 {
      font-size: 2.1rem;
    }
    h3 {
      font-size: 1.9rem;
    }
    h4 {
      font-size: 1.7rem;
    }
    h5 {
      font-size: 1.5rem;
    }
    h6 {
      font-size: 1.3rem;
    }

    ul,
    ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
      li {
        margin-bottom: 0.5rem;
        p {
          margin-bottom: 0;
        }
        ::before {
          content: '';
          margin-top: 0.75rem;
          margin-left: -1.25rem;
          width: 0.4375rem;
          height: 0.4375rem;
          border-radius: 100%;
          background-color: ${COLORS.black};
        }
      }
    }
  }
`;
