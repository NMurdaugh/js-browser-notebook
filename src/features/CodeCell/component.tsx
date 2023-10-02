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

    const showFunction = `
    import _React from 'react';
    import _ReactDOM from 'react-dom';

    var show = (value) => {
      const root = document.querySelector('#root')

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          _ReactDOM.render(value, root);
        } else {
          root.innerHTML = JSON.stringify(value)
        }
      } else {
        root.innerHTML = value
      }
    }
  `;

    const showFunctionNoOp = 'var show = () => {}';
    const cumulativeCode = [];
    for (let currentCell of orderedCells) {
      if (currentCell.type === 'code') {
        if (currentCell.id === cell.id) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoOp);
        }
        cumulativeCode.push(currentCell.content);
      }
      if (currentCell.id === cell.id) {
        break;
      }
    }
    return cumulativeCode.join('\n');
  });

  useEffect(() => {
    if (!codeBundle) {
      dispatch(createBundle({ cellId: cell.id, inputCode: cumulativeCode }));
      return;
    }

    const timer = setTimeout(async () => {
      dispatch(createBundle({ cellId: cell.id, inputCode: cumulativeCode }));
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.id]);

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
