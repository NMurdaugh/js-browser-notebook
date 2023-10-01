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
      <NoteBlock cell={cell} />
      <AddCell nextCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell
        forceVisible={cellList.length === 0}
        nextCellId={null}
      />
      {renderedCells}
    </div>
  );
};
