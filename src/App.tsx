import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
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
