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
    child = <CodeCell cell={cell} />;
  } else {
    child = <TextEditor cell={cell} />;
  }

  return (
    <div className='note-block'>
      {child}
      <ActionBar id={cell.id} />
    </div>
  );
};

export default NoteBlock;
