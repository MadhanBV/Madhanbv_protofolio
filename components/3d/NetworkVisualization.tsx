'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { generateNetworkLines, generateSpherePoints } from '@/lib/three-utils';

export function NetworkVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { nodeGeometry, lineGeometry } = useMemo(() => {
    const points = generateSpherePoints(32, 2.55);
    const nodePositions = new Float32Array(points.flat());
    const linePositions = new Float32Array(
      generateNetworkLines(points, 1.35).flat()
    );

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(nodePositions, 3)
    );

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );

    return { nodeGeometry, lineGeometry };
  }, []);

  useFrame(({ clock, pointer }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.055 + pointer.x * 0.12;
      groupRef.current.rotation.x = Math.sin(time * 0.28) * 0.08 + pointer.y * 0.08;
    }
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.size = 0.045 + Math.sin(time * 1.8) * 0.006;
    }
  });

  return (
    <group ref={groupRef} position={[0.35, 0, -2.8]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.18} />
      </lineSegments>
      <points ref={pointsRef} geometry={nodeGeometry}>
        <pointsMaterial
          color="#67e8f9"
          size={0.052}
          sizeAttenuation
          transparent
          opacity={0.78}
        />
      </points>
    </group>
  );
}

export default NetworkVisualization;

