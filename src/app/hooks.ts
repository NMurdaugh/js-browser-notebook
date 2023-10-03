import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useCumulativeCode = (cellId: string) => {
  return useAppSelector((state) => {
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
        if (currentCell.id === cellId) {
          cumulativeCode.push(showFunction);
        } else {
          cumulativeCode.push(showFunctionNoOp);
        }
        cumulativeCode.push(currentCell.content);
      }
      if (currentCell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
};
