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
  margin-top: 20px;
  padding: 0 20px;
`;

const MobileRecruitContentTitle = styled.div`
  font-size: 12px;

  color: ${COLORS.gray800};
`;

const MobileRecruitContentText = styled.div`
  width: 100%;
  min-height: 183px;
  height: 100%;
  background-color: ${COLORS.white};
  margin-top: 6px;
  padding: 13px 15px;
`;
