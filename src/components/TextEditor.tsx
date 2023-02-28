import { MutableRefObject } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

interface Props {
  editRef: MutableRefObject<any>;
  value?: string;
}

const TextEditor = ({ editRef, value }: Props) => {
  const toolbarItems: Array<Array<string>> = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  return (
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
  );
};

export default TextEditor;
