import { MutableRefObject } from 'react';
import styled from '@emotion/styled';

import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import 'prismjs/themes/prism.css';

import COLORS from 'assets/styles/colors';
import { useIsMobile } from 'hooks';

interface Props {
  editRef: MutableRefObject<any>;
  value?: string;
}

const toolbarItems = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr'],
  ['ul', 'ol', 'task'],
  ['table', 'link'],
  ['image'],
  ['code'],
  ['scrollSync'],
];

const TextEditor = ({ editRef, value }: Props) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <MobileWrapper>
        <Editor
          ref={editRef}
          initialValue={value || ''}
          placeholder="내용을 입력해주세요."
          previewStyle="vertical"
          height="100%"
          initialEditType="wysiwyg"
          toolbarItems={toolbarItems}
          plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
        />
      </MobileWrapper>
    );
  }

  return (
    <Wrapper>
      <Editor
        ref={editRef}
        initialValue={value || ''}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical"
        height="100%"
        initialEditType="wysiwyg"
        toolbarItems={toolbarItems}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </Wrapper>
  );
};

export default TextEditor;

const MobileWrapper = styled.div`
  width: 100%;
  height: 100%;

  .toastui-editor-contents {
    p {
      font-size: 0.8rem;
      line-height: 1.2rem;
      margin-bottom: 0.5rem !important;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      padding: 1rem 0 !important;
      border-bottom: none !important;
      margin: 0 !important;
      line-height: 120% !important;
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

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
      padding: 2rem 0 1rem 0;
      border-bottom: none;
      margin: 0;
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
