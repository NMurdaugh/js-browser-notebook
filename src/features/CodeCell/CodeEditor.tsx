import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import React, { useRef } from 'react';
import './CodeEditor.css';

interface ICodeEditorProps {
  initialValue: string;
  onChange: OnChange;
}

const CodeEditor: React.FC<ICodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const onFormatClick = () => {
    const rawCode = editorRef.current.getValue();

    const formattedCode = prettier.format(rawCode, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
      bracketSpacing: true,
      trailingComma: 'all',
    });

    editorRef.current.setValue(formattedCode);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        onMount={handleEditorDidMount}
        onChange={onChange}
        value={initialValue}
        height='100%'
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
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
