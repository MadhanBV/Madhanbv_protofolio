export type Point3D = [number, number, number];

export function createSeededRandom(seed = 1) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

export function generateSpherePoints(count: number, radius: number): Point3D[] {
  return Array.from({ length: count }, (_, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;

    return [
      Math.cos(theta) * Math.sin(phi) * radius,
      Math.sin(theta) * Math.sin(phi) * radius,
      Math.cos(phi) * radius,
    ];
  });
}

export function generateNetworkLines(points: Point3D[], maxDistance: number) {
  const lines: Point3D[] = [];

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (distance <= maxDistance) {
        lines.push(a, b);
      }
    }
  }

  return lines;
}

