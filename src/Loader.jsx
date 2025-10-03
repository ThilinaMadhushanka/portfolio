import React from 'react';
import { Html } from '@react-three/drei';

const CanvasLoader = () => {
  return (
    <Html center>
      <div style={{
        padding: '0.5rem 0.75rem',
        background: 'rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 8,
        color: '#fff',
        fontSize: 14
      }}>
        Loading 3D...
      </div>
    </Html>
  );
};

export default CanvasLoader;
