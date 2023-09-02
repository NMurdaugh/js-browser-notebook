import { useState } from 'react';
import bundler from '../bundler';
import CodeEditor from '../components/code-editor';
import Preview from '../components/preview';
import Resizable from './resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const bundledCode = await bundler(input);
    setCode(bundledCode);
  };

  return (
    <Resizable axis='y'>
      <div>
        <CodeEditor
          initialValue='const hey = "hello";'
          onChange={(value) => {
            if (value) setInput(value);
          }}
        />
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
