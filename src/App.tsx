import { useState } from 'react';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import {
  inputCodePathResolver,
  outputCodeFetcher,
  startEsbuildService,
} from './plugins';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const esBuildRef = await startEsbuildService();

    const result = await esBuildRef.build({
      entryPoints: ['index.js'],
      sourcemap: 'external',
      bundle: true,
      write: false,
      plugins: [inputCodePathResolver(), outputCodeFetcher(input)],
      outdir: 'out',
      define: {
        // 'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    setCode(result.outputFiles[1].text);
  };

  return (
    <>
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
    </>
  );
};

export default App;
