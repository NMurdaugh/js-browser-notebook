import { useState } from 'react';
import CodeEditor from '../components/code-editor';
import Preview from '../components/preview';
import Resizable from './resizable';
import './styles/code-cell.css';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // const onClick = async () => {
  //   const bundledCode = await bundler(input);
  //   setCode(bundledCode);
  // };

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
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
