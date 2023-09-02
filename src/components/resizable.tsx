import React from 'react';
import { ResizableBox } from 'react-resizable';
import './styles/resizable.css';

interface IResizableProps {
  axis: 'x' | 'y';
  children?: React.ReactNode;
}

const Resizable: React.FC<IResizableProps> = ({ axis, children }) => {
  return (
    <ResizableBox
      height={300}
      width={Infinity}
      resizeHandles={['s']}
      minConstraints={[Infinity, 24]}
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
    >
      children
    </ResizableBox>
  );
};

export default Resizable;
