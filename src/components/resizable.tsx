import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './styles/resizable.css';

interface IResizableProps {
  axis: 'x' | 'y';
  children?: React.ReactNode;
}

const Resizable: React.FC<IResizableProps> = ({ axis, children }) => {
  let resizableProps: ResizableBoxProps;

  if (axis === 'x') {
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: window.innerWidth * 0.55,
      resizeHandles: ['e'],
      minConstraints: [window.innerWidth * 0.25, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
    };
  } else {
    resizableProps = {
      className: 'resize-vertical',
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      minConstraints: [Infinity, window.innerHeight * 0.15],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
