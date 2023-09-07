import { CellTypes } from '.';

export type direction = 'up' | 'down';

export interface MoveCellPayload {
  id: string;
  direction: direction;
}

export type DeleteCellPayload = string;

export interface InsertCellBeforePayload {
  id: string | null;
  type: CellTypes;
}

export interface UpdateCellPayload {
  id: string;
  content: string;
}
