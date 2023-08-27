import { useRef, useState } from 'react';
import {
  inputCodePathResolver,
  outputCodeFetcher,
  startEsbuildService,
} from './plugins';

const App = () => {
  const iframe = useRef<HTMLIFrameElement>(null);
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const esBuildRef = await startEsbuildService();

    if (iframe.current) {
      iframe.current.srcdoc = html;
    }

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
    // setCode(result.outputFiles[1].text);
    iframe.current?.contentWindow?.postMessage(result.outputFiles[1].text, '*');
  };

  const html = `
    <html>
    <head></head>
    <body>
      <div id='root'></div>
      <script>
        window.addEventListener('message', (event) => {
          try {
            eval(event.data);
          } catch (error) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + error + '</div>'
            console.error(error)
          }
        }, false)
      </script>
    </body>
  </html>
  `;

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
        <iframe
          ref={iframe}
          sandbox='allow-scripts'
          srcDoc={html}
        ></iframe>
        <pre>{code}</pre>
      </div>
    </>
  );
};

export default App;
