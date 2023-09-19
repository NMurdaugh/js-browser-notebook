import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Cell, updateCell } from '../Notebook';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import ResizableWrapper from './ResizableWrapper';
// import { createBundle } from './codeBundlesSlice';
import { bundler } from './services/bundler';
import './style.css';

interface ICodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  // const codeBundle = useAppSelector((state) => state.cellBundles[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      // createBundle({ cellId: cell.id, inputCode: cell.content });

      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.error);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

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
