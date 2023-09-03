import { useEffect, useState } from 'react';
import bundler from '../bundler';
import CodeEditor from '../components/code-editor';
import Preview from '../components/preview';
import Resizable from './resizable';
import './styles/code-cell.css';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundlingResult = await bundler(input);
      setCode(bundlingResult.code);
      setError(bundlingResult.error);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable axis='y'>
      <div className='resizable-editor'>
        <Resizable axis='x'>
          <CodeEditor
            initialValue='const hey = "hello";'
            onChange={(value) => {
              if (value) setInput(value);
            }}
          />
        </Resizable>
        <Preview
          code={code}
          error={error}
        />
      </div>
    </Resizable>
  );
};

export default CodeCell;
