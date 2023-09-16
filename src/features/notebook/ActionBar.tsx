import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faXmarkCircle,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import './ActionBar.css';
import { deleteCell, moveCell } from './notebookSlice';

interface IActionBarProps {
  id: string;
}

const ActionBar: React.FC<IActionBarProps> = ({ id }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='action-bar'>
      <button
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'up' }));
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleUp} />
      </button>
      <button
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'down' }));
        }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleDown} />
      </button>
      <button
        onClick={() => {
          dispatch(deleteCell(id));
        }}
      >
        <FontAwesomeIcon icon={faXmarkCircle} />
      </button>
    </div>
  );
};

export default ActionBar;
