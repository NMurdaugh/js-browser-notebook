import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Cell, updateCell } from '../Notebook';
import './style.css';

interface ITextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<ITextEditorProps> = ({ cell }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current?.contains(event?.target as Node)) {
        return;
      }

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div
        ref={ref}
        className='text-editor send-to-top'
      >
        <MDEditor
          value={cell.content}
          onChange={(input) => {
            dispatch(updateCell({ id: cell.id, content: input || '' }));
          }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setEditing(true)}
      className='text-editor card'
    >
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};
