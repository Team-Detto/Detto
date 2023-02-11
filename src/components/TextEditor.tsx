import { MutableRefObject } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

interface Props {
  editRef: MutableRefObject<any>;
}

const TextEdiotr = ({ editRef }: Props) => {
  const toolbarItems: Array<Array<string>> = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ];

  return (
    <Editor
      ref={editRef}
      placeholder="내용을 입력해주세요."
      previewStyle="vertical"
      height="100%"
      initialEditType="wysiwyg"
      toolbarItems={toolbarItems}
      plugins={[colorSyntax]}
    />
  );
};

export default TextEdiotr;
