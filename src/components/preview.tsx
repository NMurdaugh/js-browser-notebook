import React, { useEffect, useRef } from 'react';
import './styles/preview.css';

interface IPreviewProps {
  code: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
<body>
  <div id='root'></div>
  <script>
    const handleError = (error) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + error + '</div>'
      console.error(error)
    }
    window.addEventListener('message', (event) => {
      try {
        eval(event.data);
      } catch (error) {
        handleError(error)
      }
    }, false)
  </script>
</body>
</html>
`;

const Preview: React.FC<IPreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        iframe.current?.contentWindow?.postMessage(code, '*');
      }, 50);
    }
  }, [code]);

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;
