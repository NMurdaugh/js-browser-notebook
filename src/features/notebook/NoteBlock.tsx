import React from 'react';
import { Cell } from './types';

interface INoteBlockProps {
  cell: Cell;
}

const NoteBlock: React.FC<INoteBlockProps> = ({ cell }) => {
  return <div>{cell.id}</div>;
};

export default NoteBlock;
