import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import './Background3D.css';

const Scene = () => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={100} 
      depth={50} 
      count={4000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
};

const Background3D = () => {
  return (
    <div className="background-3d-wrapper">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
