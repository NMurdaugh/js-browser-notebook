import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <Editor
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
