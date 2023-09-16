import React from 'react';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';
import ActionBar from './ActionBar';
import './NoteBlock.css';
import { Cell } from './types';

interface INoteBlockProps {
  cell: Cell;
}

const NoteBlock: React.FC<INoteBlockProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={cell} />
        <ActionBar id={cell.id} />
      </>
    );
  }

  return <div className='note-block'>{child}</div>;
};

export default NoteBlock;
