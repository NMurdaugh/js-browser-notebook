import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteCell, moveCell } from './notebookSlice';

interface IActionBarProps {
  id: string;
}

const ActionBar: React.FC<IActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'up' }));
        }}
      >
        Up
      </button>
      <button
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'down' }));
        }}
      >
        Down
      </button>
      <button
        onClick={() => {
          dispatch(deleteCell(id));
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ActionBar;
