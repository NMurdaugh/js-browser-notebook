import React from 'react';
import CodeCell from '../CodeCell';
import TextEditor from '../TextEditor';
import ActionBar from './ActionBar';
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
    <div>
      <ActionBar id={cell.id} />
      {child}
    </div>
  );
};

export default NoteBlock;
