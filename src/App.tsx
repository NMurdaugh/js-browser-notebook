import { useState } from 'react';
import { startService } from './plugins';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const esBuildRef = await startService();
    const result = await esBuildRef.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });
    setCode(result.code);
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
