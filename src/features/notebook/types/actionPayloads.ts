import { CellTypes } from '.';

export type direction = 'up' | 'down';

export interface IMoveCellPayload {
  id: string;
  direction: direction;
}

export type IDeleteCellPayload = string;

export interface IInsertCellAfterPayload {
  id: string | null;
  type: CellTypes;
}

export interface IUpdateCellPayload {
  id: string;
  content: string;
}
