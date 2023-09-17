import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import './AddCell.css';
import { insertCellAfter } from './notebookSlice';

interface IAddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<IAddCellProps> = ({ nextCellId, forceVisible }) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCellAfter({ id: nextCellId, type: 'code' }))
          }
        >
          <span className='icon is-small'>
            <FontAwesomeIcon icon={faPlusSquare} />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCellAfter({ id: nextCellId, type: 'text' }))
          }
        >
          <span className='icon is-small'>
            <FontAwesomeIcon icon={faPlusSquare} />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider'></div>
    </div>
  );
};

export default AddCell;
