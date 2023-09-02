import React, { useEffect, useRef } from 'react';
import './styles/preview.css';

interface IPreviewProps {
  code: string;
}

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

const Preview: React.FC<IPreviewProps> = ({ code }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframe.current) {
      iframe.current.srcdoc = html;
    }
  }, [code]);

  iframe.current?.contentWindow?.postMessage(code, '*');

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
