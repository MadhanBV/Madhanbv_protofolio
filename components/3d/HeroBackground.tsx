'use client';

import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import NetworkVisualization from './NetworkVisualization';
import ParticleSystem from './ParticleSystem';
import { useMediaQuery } from '@/components/hooks/useMediaQuery';

function CameraRig() {
  useFrame((state) => {
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.3, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.18, 0.04);
    camera.lookAt(0, 0, -2);
  });

  return null;
}

export function HeroBackground() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] [background-size:48px_48px]"
      />
    );
  }

  return (
    <div aria-hidden="true" className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 5.3], fov: 48 }}
        dpr={[1, 1.45]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.55} />
          <pointLight position={[2.8, 2.3, 3]} intensity={1.1} color="#38bdf8" />
          <pointLight position={[-3, -1.8, 2]} intensity={0.55} color="#22c55e" />
          <ParticleSystem />
          <NetworkVisualization />
          <CameraRig />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.28)_48%,rgba(0,0,0,0.76))]" />
    </div>
  );
}

export default HeroBackground;

