import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Cell, updateCell } from '../Notebook';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import ResizableWrapper from './ResizableWrapper';
import bundler from './services';
import './style.css';

interface ICodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundlingResult = await bundler(cell.content);
      setCode(bundlingResult.code);
      setError(bundlingResult.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <ResizableWrapper axis='y'>
      <div className='resizable-editor'>
        <ResizableWrapper axis='x'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => {
              if (value) {
                dispatch(updateCell({ id: cell.id, content: value }));
              }
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
