import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import './AddCell.css';
import { insertCellBefore } from './notebookSlice';

interface IAddCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<IAddCellProps> = ({ nextCellId }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='add-cell'>
      <button
        onClick={() =>
          dispatch(insertCellBefore({ id: nextCellId, type: 'code' }))
        }
      >
        + Code
      </button>
      <button
        onClick={() =>
          dispatch(insertCellBefore({ id: nextCellId, type: 'text' }))
        }
      >
        + Text
      </button>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
