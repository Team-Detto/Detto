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
        {isLoaded && (
          <Viewer
            initialValue={content}
            plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          />
        )}
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
