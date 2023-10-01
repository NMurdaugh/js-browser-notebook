import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Cell, updateCell } from '../Notebook';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import ResizableWrapper from './ResizableWrapper';
import { createBundle } from './codeBundlesSlice';
import './style.css';

interface ICodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCellProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const codeBundle = useAppSelector((state) => state.cellBundles[cell.id]);
  const cumulativeCode = useAppSelector((state) => {
    const { data, order } = state.notebook;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCode = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === 'code') {
        cumulativeCode.push(currentCell.content);
      }
      if (currentCell.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  useEffect(() => {
    if (!codeBundle) {
      dispatch(createBundle({ cellId: cell.id, inputCode: cell.content }));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle({ cellId: cell.id, inputCode: cell.content }));
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

        <div className='preview-wrapper'>
          {!codeBundle || codeBundle.processing ? (
            <div className='progress-cover'>
              <progress
                className='progress is-small is-primary'
                max='100'
              >
                Loading
              </progress>
            </div>
          ) : (
            <CodePreview
              code={codeBundle.code}
              error={codeBundle.error}
            />
          )}
        </div>
      </div>
    </ResizableWrapper>
  );
};
