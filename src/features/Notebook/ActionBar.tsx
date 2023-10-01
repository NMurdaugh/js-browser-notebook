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
        className='button is-primary is-small'
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'up' }));
        }}
      >
        <span className='icon'>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => {
          dispatch(moveCell({ id: id, direction: 'down' }));
        }}
      >
        <span className='icon'>
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => {
          dispatch(deleteCell(id));
        }}
      >
        <span className='icon'>
          <FontAwesomeIcon icon={faXmarkCircle} />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
