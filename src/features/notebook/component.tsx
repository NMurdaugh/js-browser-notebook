import React from 'react';
import { useAppSelector } from '../../app/hooks';
import NoteBlock from './NoteBlock';

export const Notebook: React.FC = () => {
  const cellList = useAppSelector(({ notebook: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cellList.map((cell) => (
    <NoteBlock
      key={cell.id}
      cell={cell}
    />
  ));

  return <div>{renderedCells}</div>;
};
