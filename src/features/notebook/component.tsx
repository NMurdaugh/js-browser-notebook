import React, { Fragment } from 'react';
import { useAppSelector } from '../../app/hooks';
import AddCell from './AddCell';
import NoteBlock from './NoteBlock';

export const Notebook: React.FC = () => {
  const cellList = useAppSelector(({ notebook: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderedCells = cellList.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <NoteBlock cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell
        forceVisible={cellList.length === 0}
        nextCellId={null}
      />
    </div>
  );
};
