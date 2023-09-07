import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './ResizableWrapper.css';

interface IResizableProps {
  axis: 'x' | 'y';
  children?: React.ReactNode;
}

const ResizableWrapper: React.FC<IResizableProps> = ({ axis, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.55);

  useEffect(() => {
    let timer: number;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.55 > width) {
          setWidth(window.innerWidth * 0.55);
        }
      });
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  if (axis === 'x') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: width,
      resizeHandles: ['e'],
      minConstraints: [innerWidth * 0.25, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      onResizeStop: (_, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: 'resize-vertical',
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, innerHeight * 0.15],
      maxConstraints: [Infinity, innerHeight * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default ResizableWrapper;
