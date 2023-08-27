import Editor from '@monaco-editor/react';
import React from 'react';

interface ICodeEditorProps {
  initialValue: string;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue }) => {
  return (
    <Editor
      value={initialValue}
      height='250px'
      language='javascript'
      theme='vs-dark'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        cursorBlinking: 'phase',
      }}
    />
  );
};

export default CodeEditor;
