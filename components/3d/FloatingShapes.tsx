'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shapeConfigs = [
  { position: [-3.4, 1.5, -1.6], scale: 0.55, color: '#38bdf8', type: 'ico' },
  { position: [3.2, 0.8, -2.4], scale: 0.44, color: '#22c55e', type: 'torus' },
  { position: [-1.2, -1.3, -2.2], scale: 0.34, color: '#a78bfa', type: 'torus' },
  { position: [1.4, -1.65, -1.8], scale: 0.5, color: '#f59e0b', type: 'ico' },
] as const;

function FloatingShape({
  position,
  scale,
  color,
  type,
  index,
}: (typeof shapeConfigs)[number] & { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.2,
        metalness: 0.56,
        roughness: 0.24,
        transparent: true,
        opacity: 0.72,
        wireframe: index % 2 === 0,
      }),
    [color, index]
  );

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * (0.16 + index * 0.03) + pointer.y * 0.16;
    ref.current.rotation.y = t * (0.2 + index * 0.025) + pointer.x * 0.18;
    ref.current.position.y =
      position[1] + Math.sin(t * 0.9 + index * 1.4) * 0.16;
  });

  return (
    <mesh ref={ref} position={position} scale={scale} material={material}>
      {type === 'ico' ? (
        <icosahedronGeometry args={[1, 1]} />
      ) : (
        <torusKnotGeometry args={[0.74, 0.22, 92, 12]} />
      )}
    </mesh>
  );
}

export function FloatingShapes() {
  return (
    <>
      {shapeConfigs.map((config, index) => (
        <FloatingShape
          key={`${config.type}-${config.color}`}
          {...config}
          index={index}
        />
      ))}
    </>
  );
}

export default FloatingShapes;

