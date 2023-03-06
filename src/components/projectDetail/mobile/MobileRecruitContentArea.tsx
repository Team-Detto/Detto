import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

const MobileRecruitContentArea = ({ content }: any) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MobileRecruitContentContainer>
      <MobileRecruitContentTitle>모집안내</MobileRecruitContentTitle>
      <MobileRecruitContentText>
        <ContentWrapper>
          {isLoaded && (
            <Viewer
              initialValue={content}
              plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
            />
          )}
        </ContentWrapper>
      </MobileRecruitContentText>
    </MobileRecruitContentContainer>
  );
};

export default MobileRecruitContentArea;

const MobileRecruitContentContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 1.25rem;
  padding: 0 1.25rem;
`;

const MobileRecruitContentTitle = styled.div`
  font-size: 0.75rem;

  color: ${COLORS.gray800};
`;

const MobileRecruitContentText = styled.div`
  width: 100%;
  min-height: 11.4375rem;
  height: 100%;
  background-color: ${COLORS.white};
  margin-top: 0.375rem;
  padding: 0.8125rem 0.9375rem;
`;

const ContentWrapper = styled.div`
  .toastui-editor-contents {
    p {
      font-size: 0.8rem;
      line-height: 1.2rem;
      margin-bottom: 0.5rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 1rem 0 0.2rem 0;
      border-bottom: none;
      margin: 0;

      &:first-child {
        padding-top: 0;
      }
    }

    h1 {
      font-size: 1.4rem;
    }
    h2 {
      font-size: 1.3rem;
    }
    h3 {
      font-size: 1.2rem;
    }
    h4 {
      font-size: 1.1rem;
    }
    h5 {
      font-size: 1rem;
    }
    h6 {
      font-size: 0.9rem;
    }

    ul,
    ol {
      margin-bottom: 1rem;
      li {
        line-height: 1.2rem;
        p {
          margin-bottom: 0;
        }
        ::before {
          content: '';
          margin-top: 0.5rem;
          margin-left: -0.9rem;
          width: 0.25rem;
          height: 0.25rem;
          border-radius: 100%;
          background-color: ${COLORS.black};
        }
      }
    }
  }
`;
