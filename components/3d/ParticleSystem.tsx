'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createSeededRandom } from '@/lib/three-utils';

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const basePositionsRef = useRef<Float32Array | null>(null);

  const geometry = useMemo(() => {
    const random = createSeededRandom(42);
    const count = 420;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (random() - 0.5) * 8.5;
      positions[index * 3 + 1] = (random() - 0.5) * 5.2;
      positions[index * 3 + 2] = (random() - 0.5) * 4.8 - 1.8;
    }

    basePositionsRef.current = positions.slice();
    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    return bufferGeometry;
  }, []);

  useFrame(({ clock, pointer }) => {
    const points = pointsRef.current;
    const base = basePositionsRef.current;
    if (!points || !base) return;

    const attribute = points.geometry.getAttribute(
      'position'
    ) as THREE.BufferAttribute;
    const positions = attribute.array as Float32Array;
    const time = clock.getElapsedTime();

    for (let index = 0; index < positions.length; index += 3) {
      const wave = Math.sin(time * 0.35 + base[index] * 1.3) * 0.04;
      positions[index] = base[index] + pointer.x * 0.18 + wave;
      positions[index + 1] =
        base[index + 1] + pointer.y * 0.12 + Math.cos(time * 0.3 + index) * 0.025;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#d9f99d"
        size={0.018}
        sizeAttenuation
        transparent
        opacity={0.42}
      />
    </points>
  );
}

export default ParticleSystem;

