import React, { useEffect, useState } from 'react';
import { Cell } from '../Notebook';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import ResizableWrapper from './ResizableWrapper';
import bundler from './services';
import './style.css';

interface ICodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundlingResult = await bundler(input);
      setCode(bundlingResult.code);
      setError(bundlingResult.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <ResizableWrapper axis='y'>
      <div className='resizable-editor'>
        <ResizableWrapper axis='x'>
          <CodeEditor
            initialValue='const hey = "hello";'
            onChange={(value) => {
              if (value) setInput(value);
            }}
          />
        </ResizableWrapper>
        <CodePreview
          code={code}
          error={error}
        />
      </div>
    </ResizableWrapper>
  );
};
