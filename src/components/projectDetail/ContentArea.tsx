import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

const ContentArea = ({ projectData }: any) => {
  return (
    <RecruitContentsContainer>
      <ContentTitle>모집 안내</ContentTitle>
      <ContentWrapper>
        <Viewer
          initialValue={projectData.content}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        />
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
  //스크롤바
  overflow-y: scroll;
`;
