import { useState } from 'react';
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
    // const result = await esBuildRef.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });
    const result = await esBuildRef.build({
      entryPoints: ['index.js'],
      sourcemap: 'external',
      bundle: true,
      write: false,
      plugins: [inputCodePathResolver(), outputCodeFetcher(input)],
      define: {
        // 'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
      outdir: 'out',
    });

    setCode(result.outputFiles[1].text);
  };

  return (
    <>
      <div>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
        ></textarea>
        <div>
          <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
      </div>
    </>
  );
};

export default App;
