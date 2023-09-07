import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useRef, useState } from 'react';
import { Cell } from '../Notebook';
import './style.css';

interface ITextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<ITextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState('# Start writing');

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
        className='text-editor'
      >
        <MDEditor
          value={value}
          onChange={(input) => setValue(input || '')}
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
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};
