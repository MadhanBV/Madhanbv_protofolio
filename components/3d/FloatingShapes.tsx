'use client';

/**
 * FloatingShapes.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Cinematic floating portrait bubbles for a Next.js / React Three Fiber hero.
 *
 * Features
 * ────────
 *  • Circular portrait cards that rise from bottom to top, forever looping.
 *  • Per-portrait crop control so every face is perfectly centered.
 *  • Three-layer glow system: inner bloom → mid bloom → outer diffuse halo.
 *  • Quintic smootherstep fade envelope — zero-velocity entry and exit.
 *  • Billboard (always face camera) with organic Z-axis tilt sway.
 *  • Optional label/particles/ring/shimmer (disabled in shadow mode below).
 *  • Shadow-mode: desaturated portraits with soft, neutral shadow halos.
 *  • Staggered phase offsets — five portraits always evenly spread vertically.
 *  • Depth-of-field illusion: deeper-anchored portraits are slightly dimmer.
 *  • Coloured point lights track each portrait to light the scene.
 *  • Full TypeScript types throughout.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';

// ═══════════════════════════════════════════════════════════════════════════════
// 1. TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface CropConfig {
  /**
   * UV repeat factor [x, y].
   * Values < 1 zoom in on the image so the face fills the circle.
   */
  repeat: [number, number];
  /**
   * UV offset [x, y] to shift the crop window and center the face.
   */
  offset: [number, number];
}

interface PortraitConfig {
  /** Display name shown as a glow-tinted label below the portrait. */
  name: string;
  /** Absolute path to the portrait image file (served from /public). */
  imageUrl: string;
  /** CSS hex colour used for glow, label, particles, and emissive. */
  tint: string;
  /**
   * World-space [x, z] anchor.
   * Y is animated (the rise); x/z receive a gentle sine drift on top.
   */
  anchor: [number, number];
  /** Uniform THREE.Group scale applied to the whole portrait assembly. */
  scale: number;
  /** Rise cycles per second.  Lower = slower, dreamier. */
  speed: number;
  /**
   * Starting phase offset in [0, 1].
   * Five portraits at 0 / 0.2 / 0.4 / 0.6 / 0.8 → evenly spaced.
   */
  phase: number;
  /** Per-portrait UV crop configuration. */
  crop: CropConfig;
  /** Number of sparkle particles in the trail behind this portrait. */
  particleCount: number;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

const PORTRAIT_CONFIGS: PortraitConfig[] = [
  {
    name: 'Elon Musk',
    imageUrl: '/images/inspirations/elon.jpg',
    tint: '#94a3b8',          // neutral slate
    anchor: [-3.1, -2.35],
    scale: 0.88,
    speed: 0.068,
    phase: 0.00,              // starts near the bottom
    crop: { repeat: [0.78, 0.78], offset: [0.11, 0.16] },
    particleCount: 6,
  },
  {
    name: 'Deepinder Goyal',
    imageUrl: '/images/inspirations/goyal.jpg',
    tint: '#94a3b8',          // neutral slate
    anchor: [3.05, -2.45],
    scale: 0.78,
    speed: 0.060,
    phase: 0.20,              // 1/5 of the way through the rise
    crop: { repeat: [0.82, 0.82], offset: [0.09, 0.12] },
    particleCount: 5,
  },
  {
    name: 'A. P. J. Abdul Kalam',
    imageUrl: '/images/inspirations/kalam.jpg',
    tint: '#94a3b8',          // neutral slate
    anchor: [-0.85, -1.65],
    scale: 0.90,
    speed: 0.074,
    phase: 0.40,              // 2/5 of the way up
    crop: { repeat: [0.80, 0.80], offset: [0.10, 0.14] },
    particleCount: 7,
  },
  {
    name: 'Mark Zuckerberg',
    imageUrl: '/images/inspirations/zuck.jpg',
    tint: '#94a3b8',          // neutral slate
    anchor: [0.15, -2.95],
    scale: 0.76,
    speed: 0.066,
    phase: 0.60,              // 3/5 of the way up
    crop: { repeat: [0.82, 0.82], offset: [0.09, 0.10] },
    particleCount: 5,
  },
  {
    name: 'Sundar Pichai',
    imageUrl: '/images/inspirations/pichai.jpg',
    tint: '#94a3b8',          // neutral slate
    anchor: [1.45, -2.05],
    scale: 0.82,
    speed: 0.065,
    phase: 0.80,              // 4/5 of the way up
    crop: { repeat: [0.80, 0.80], offset: [0.10, 0.12] },
    particleCount: 6,
  },
];

/** Vertical world-space band the portraits travel through. */
const RISE = { MIN: -3.2, MAX: 3.4 } as const;

/** Progress thresholds (0–1) for the fade-in / fade-out envelope. */
const FADE = {
  IN_START:  0.00,
  IN_END:    0.16,
  OUT_START: 0.80,
  OUT_END:   0.98,
} as const;

const STYLE = {
  showLabels: false,
  showParticles: false,
  showChromaticRing: false,
  showShimmer: false,
  showLights: false,
} as const;

const PORTRAIT_TINT = '#d1d5db';
const SHADOW_TINT = '#0f172a';

// ═══════════════════════════════════════════════════════════════════════════════
// 3. MATH UTILITIES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Standard cubic smoothstep.
 * Returns 0 at edge0 and 1 at edge1 with smooth S-curve between.
 */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Quintic smootherstep (Perlin's version).
 * Zero first AND second derivatives at edges → butter-smooth entry/exit.
 */
function smootherstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

/**
 * Visibility envelope for a single rise cycle.
 * Fades in over the first 16 % and fades out over the last 18 %.
 */
function visibilityEnvelope(progress: number): number {
  const fadeIn  = smootherstep(FADE.IN_START,  FADE.IN_END,    progress);
  const fadeOut = 1 - smootherstep(FADE.OUT_START, FADE.OUT_END, progress);
  return fadeIn * fadeOut;
}

/**
 * Remap value from one numeric range to another.
 */
function remap(
  value: number,
  inMin: number, inMax: number,
  outMin: number, outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Deterministic pseudo-random float in [0, 1) from an integer seed.
 * Uses the classic sin-hash trick — same seed always returns same value.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 43758.5453123;
  return x - Math.floor(x);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. PARTICLE TRAIL
// ═══════════════════════════════════════════════════════════════════════════════

interface ParticleTrailProps {
  tint: string;
  count: number;
  portraitIndex: number;
}

/**
 * Tiny additive sparkle dots that drift upward in a disc behind the portrait,
 * suggesting rising energy / light particles.
 * Positions are updated in-place each frame to avoid re-allocating Float32Arrays.
 */
function ParticleTrail({ tint, count, portraitIndex }: ParticleTrailProps) {
  const pointsRef = useRef<THREE.Points>(null);

  /**
   * Stable random seed data computed once on mount.
   * originX/Y: resting spread within a ~0.55 radius disc.
   * speeds / phases: individual drift rates.
   */
  const seedData = useMemo(() => {
    const originX = new Float32Array(count);
    const originY = new Float32Array(count);
    const speeds  = new Float32Array(count);
    const phases  = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const seed   = portraitIndex * 1000 + i;
      const angle  = seededRandom(seed * 7)  * Math.PI * 2;
      const radius = seededRandom(seed * 13) * 0.55;
      originX[i]   = Math.cos(angle) * radius;
      originY[i]   = (seededRandom(seed * 17) - 0.5) * 1.1;
      speeds[i]    = 0.28 + seededRandom(seed * 31) * 0.52;
      phases[i]    = seededRandom(seed * 53);
    }
    return { originX, originY, speeds, phases };
  }, [count, portraitIndex]);

  /** BufferGeometry seeded with starting positions. */
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = seedData.originX[i];
      positions[i * 3 + 1] = seedData.originY[i];
      positions[i * 3 + 2] = -0.06; // just behind the portrait face
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count, seedData]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color:           tint,
        size:            0.048,
        transparent:     true,
        opacity:         0.60,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
        sizeAttenuation: true,
      }),
    [tint]
  );

  // Working array reused every frame to avoid GC pressure
  const workArray = useRef(new Float32Array(count * 3));

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t   = clock.getElapsedTime();
    const arr = workArray.current;
    const { originX, originY, speeds, phases } = seedData;

    for (let i = 0; i < count; i++) {
      // Particles loop in a 1.4-unit vertical window
      const cycleY = ((t * speeds[i] + phases[i]) % 1.4) - 0.7;
      arr[i * 3 + 0] = originX[i] + Math.sin(t * 0.85 + i * 1.1) * 0.045;
      arr[i * 3 + 1] = originY[i] + cycleY;
      arr[i * 3 + 2] = -0.06;
    }

    const attr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    attr.set(arr);
    attr.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} renderOrder={0} />;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. CHROMATIC RING
// ═══════════════════════════════════════════════════════════════════════════════

interface ChromaticRingProps {
  tint: string;
  phase: number;
}

/**
 * A thin RingGeometry outline at the portrait edge.
 * Its colour oscillates between the base tint and a hue-shifted variant,
 * creating a subtle chromatic-aberration / holographic outline effect.
 * The ring also slowly rotates for extra life.
 */
function ChromaticRing({ tint, phase }: ChromaticRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const baseTint = useMemo(() => new THREE.Color(tint), [tint]);

  /** A slightly hue-rotated variant of the base tint. */
  const shiftedTint = useMemo(() => {
    const hsl = { h: 0, s: 0, l: 0 };
    baseTint.getHSL(hsl);
    return new THREE.Color().setHSL((hsl.h + 0.09) % 1, hsl.s, Math.min(hsl.l + 0.08, 1));
  }, [baseTint]);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color:      new THREE.Color(tint),
        transparent: true,
        opacity:    0.50,
        blending:   THREE.AdditiveBlending,
        depthWrite: false,
        side:       THREE.FrontSide,
      }),
    [tint]
  );

  // Thin ring — outer 1.03, inner 0.97
  const geometry = useMemo(() => new THREE.RingGeometry(0.97, 1.035, 96), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Hue oscillation
    const blend = 0.5 + 0.5 * Math.sin(t * 1.05 + phase * Math.PI * 2);
    material.color.lerpColors(baseTint, shiftedTint, blend);

    // Opacity pulse
    material.opacity = 0.32 + 0.22 * Math.sin(t * 2.15 + phase * 5.0);

    // Slow rotation
    meshRef.current.rotation.z = t * 0.17 + phase;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} renderOrder={3} />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. SHIMMER SWEEP
// ═══════════════════════════════════════════════════════════════════════════════

interface ShimmerSweepProps {
  tint: string;
  speed: number;
  phase: number;
}

/**
 * A thin horizontal highlight bar that sweeps upward across the portrait
 * during each rise cycle — like a holographic scan line or lens flare pass.
 * It is invisible outside the portrait's visible window.
 */
function ShimmerSweep({ tint, speed, phase }: ShimmerSweepProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color:      new THREE.Color(tint).multiplyScalar(2.2),
        transparent: true,
        opacity:    0,
        blending:   THREE.AdditiveBlending,
        depthWrite: false,
        side:       THREE.FrontSide,
      }),
    [tint]
  );

  // Thin horizontal stripe covering the full portrait width
  const geometry = useMemo(() => new THREE.PlaneGeometry(1.92, 0.048), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t        = clock.getElapsedTime();
    const progress = (t * speed + phase) % 1.0;

    // Active sweep window: progress 0.10 → 0.74
    const sweepT = THREE.MathUtils.clamp(remap(progress, 0.10, 0.74, 0, 1), 0, 1);

    // Bar travels from y = -1.05 → +1.05 across the portrait face
    meshRef.current.position.y = THREE.MathUtils.lerp(-1.05, 1.05, sweepT);

    // Brightest in the middle of its travel arc
    const arcBright = Math.sin(sweepT * Math.PI);

    // Only visible during the portrait's visible phase
    const visGate = smoothstep(FADE.IN_START, FADE.IN_END, progress)
      * (1 - smoothstep(FADE.OUT_START, FADE.OUT_END, progress));

    material.opacity = 0.24 * arcBright * visGate;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, 0.015]}
      renderOrder={4}
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 7. NAME LABEL
// ═══════════════════════════════════════════════════════════════════════════════

interface NameLabelProps {
  name: string;
  tint: string;
}

/**
 * Drei <Text> component rendered as a glow-tinted label below each portrait.
 * Opacity is driven by the parent group's material changes via the
 * material-opacity prop, leveraging Drei's material pass-through.
 */
function NameLabel({ name, tint }: NameLabelProps) {
  return (
    <Text
      position={[0, -1.32, 0.02]}
      fontSize={0.155}
      color={tint}
      anchorX="center"
      anchorY="top"
      letterSpacing={0.07}
      maxWidth={3.5}
      textAlign="center"
      renderOrder={5}
      material-transparent
      material-depthWrite={false}
      material-blending={THREE.AdditiveBlending}
    >
      {name.toUpperCase()}
    </Text>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. FLOATING INSPIRATION (single portrait assembly)
// ═══════════════════════════════════════════════════════════════════════════════

type FloatingInspirationProps = PortraitConfig & { index: number };

function FloatingInspiration({
  name,
  imageUrl,
  tint,
  anchor,
  scale,
  speed,
  phase,
  crop,
  particleCount,
  index,
}: FloatingInspirationProps) {

  // ── Refs for every animated mesh ────────────────────────────────────────────
  const groupRef       = useRef<THREE.Group>(null);
  const portraitRef    = useRef<THREE.Mesh>(null);
  const innerGlowRef   = useRef<THREE.Mesh>(null);
  const midGlowRef     = useRef<THREE.Mesh>(null);
  const outerGlowRef   = useRef<THREE.Mesh>(null);

  // ── Texture loading ─────────────────────────────────────────────────────────
  const texture = useTexture(imageUrl);

  useEffect(() => {
    texture.colorSpace  = THREE.SRGBColorSpace;
    texture.anisotropy  = 16;
    texture.minFilter   = THREE.LinearMipmapLinearFilter;
    texture.magFilter   = THREE.LinearFilter;
    texture.wrapS       = THREE.ClampToEdgeWrapping;
    texture.wrapT       = THREE.ClampToEdgeWrapping;
    texture.repeat.set(crop.repeat[0], crop.repeat[1]);
    texture.offset.set(crop.offset[0], crop.offset[1]);
    texture.needsUpdate = true;
  }, [texture, crop]);

  // ── Cached THREE.Color objects for lerping without allocation ───────────────
  const portraitColor = useMemo(() => new THREE.Color(PORTRAIT_TINT), []);
  const shadowColor = useMemo(() => new THREE.Color(SHADOW_TINT), []);

  // ── Materials ────────────────────────────────────────────────────────────────

  /** Main portrait circle with photo texture and emissive tint. */
  const portraitMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map:           texture,
        transparent:   true,
        opacity:       1,
        color:         portraitColor,
        side:          THREE.FrontSide,
        depthWrite:    false,
      }),
    [texture, portraitColor]
  );

  /** Tight inner halo — 6.5 % larger than the portrait radius. */
  const innerGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color:       shadowColor,
        transparent: true,
        opacity:     0.22,
        blending:    THREE.NormalBlending,
        depthWrite:  false,
      }),
    [shadowColor]
  );

  /** Mid bloom — 30 % larger radius, softer. */
  const midGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color:       shadowColor,
        transparent: true,
        opacity:     0.12,
        blending:    THREE.NormalBlending,
        depthWrite:  false,
      }),
    [shadowColor]
  );

  /** Wide outer diffuse bloom — 70 % larger radius, very faint. */
  const outerGlowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color:       shadowColor,
        transparent: true,
        opacity:     0.06,
        blending:    THREE.NormalBlending,
        depthWrite:  false,
      }),
    [shadowColor]
  );

  // ── Geometries (high-poly circles for silky edges) ──────────────────────────
  const portraitGeo  = useMemo(() => new THREE.CircleGeometry(1.000, 128), []);
  const innerGlowGeo = useMemo(() => new THREE.CircleGeometry(1.065, 128), []);
  const midGlowGeo   = useMemo(() => new THREE.CircleGeometry(1.300, 128), []);
  const outerGlowGeo = useMemo(() => new THREE.CircleGeometry(1.700, 128), []);

  /**
   * Depth-of-field illusion factor.
   * Portraits with a larger absolute Z anchor appear slightly dimmer.
   */
  const dofFactor = useMemo(
    () => THREE.MathUtils.clamp(1 - Math.abs(anchor[1]) * 0.038, 0.82, 1.0),
    [anchor]
  );

  // ── Per-frame animation ──────────────────────────────────────────────────────
  useFrame(({ clock, camera }) => {
    if (
      !groupRef.current     ||
      !portraitRef.current  ||
      !innerGlowRef.current ||
      !midGlowRef.current   ||
      !outerGlowRef.current
    ) return;

    const t        = clock.getElapsedTime();
    const progress = (t * speed + phase) % 1.0;

    // ── Position: rise + organic drift ────────────────────────────────────────
    const riseY  = THREE.MathUtils.lerp(RISE.MIN, RISE.MAX, progress);
    const driftX = Math.sin(t * 0.52 + index * 1.35) * 0.16;
    const driftZ = Math.cos(t * 0.39 + phase  * 7.30) * 0.11;

    groupRef.current.position.set(
      anchor[0] + driftX,
      riseY,
      anchor[1] + driftZ,
    );

    // ── Orientation: billboard to camera + gentle tilt ────────────────────────
    groupRef.current.quaternion.copy(camera.quaternion);
    groupRef.current.rotateZ(Math.sin(t * 0.46 + phase * 5.8) * 0.065);

    // ── Visibility envelope ───────────────────────────────────────────────────
    const vis      = visibilityEnvelope(progress) * dofFactor;

    // ── Portrait: opacity + emissive ──────────────────────────────────────────
    portraitMat.opacity = 0.9 * vis;

    const shadowPulse = 0.98 + Math.sin(t * 1.1 + index * 0.7) * 0.02;

    // ── Inner halo ────────────────────────────────────────────────────────────
    innerGlowMat.opacity = 0.22 * vis;
    innerGlowRef.current.scale.setScalar(1.00 + shadowPulse * 0.02);

    // ── Mid bloom ─────────────────────────────────────────────────────────────
    midGlowMat.opacity = 0.12 * vis;
    midGlowRef.current.scale.setScalar(1.00 + shadowPulse * 0.04);

    // ── Outer diffuse halo ────────────────────────────────────────────────────
    outerGlowMat.opacity = 0.06 * vis;
    outerGlowRef.current.scale.setScalar(1.00 + shadowPulse * 0.06);
  });

  // ── Scene graph ─────────────────────────────────────────────────────────────
  return (
    <group ref={groupRef} scale={scale}>

      {/* ── Render layer 0: widest outer bloom ── */}
      <mesh
        ref={outerGlowRef}
        geometry={outerGlowGeo}
        material={outerGlowMat}
        renderOrder={0}
      />

      {/* ── Render layer 1: mid bloom ── */}
      <mesh
        ref={midGlowRef}
        geometry={midGlowGeo}
        material={midGlowMat}
        renderOrder={1}
      />

      {/* ── Render layer 2: tight inner halo ── */}
      <mesh
        ref={innerGlowRef}
        geometry={innerGlowGeo}
        material={innerGlowMat}
        renderOrder={2}
      />

      {/* ── Render layer 3: portrait face ── */}
      <mesh
        ref={portraitRef}
        geometry={portraitGeo}
        material={portraitMat}
        renderOrder={3}
      />

      {/* ── Render layer 4: chromatic edge ring ── */}
      {STYLE.showChromaticRing ? <ChromaticRing tint={tint} phase={phase} /> : null}

      {/* ── Render layer 5: horizontal shimmer sweep ── */}
      {STYLE.showShimmer ? <ShimmerSweep tint={tint} speed={speed} phase={phase} /> : null}

      {/* ── Render layer 6: rising sparkle particles ── */}
      {STYLE.showParticles ? (
        <ParticleTrail
          tint={tint}
          count={particleCount}
          portraitIndex={index}
        />
      ) : null}

      {/* ── Render layer 7: name label ── */}
      {STYLE.showLabels ? <NameLabel name={name} tint={tint} /> : null}

    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 9. AMBIENT INSPIRATION LIGHTS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Five coloured point lights, one per portrait, that track the portrait
 * positions and contribute soft tinted illumination to any surrounding
 * geometry (floor plane, background particles, etc.).
 */
function AmbientInspirationLights() {
  // Store refs in a stable array (length never changes)
  const lightsRef = useRef<(THREE.PointLight | null)[]>(
    Array(PORTRAIT_CONFIGS.length).fill(null)
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    PORTRAIT_CONFIGS.forEach((cfg, i) => {
      const light = lightsRef.current[i];
      if (!light) return;

      const progress  = (t * cfg.speed + cfg.phase) % 1.0;
      const rise      = THREE.MathUtils.lerp(RISE.MIN, RISE.MAX, progress);
      const vis       = visibilityEnvelope(progress);
      const driftX    = Math.sin(t * 0.52 + i * 1.35) * 0.16;
      const driftZ    = Math.cos(t * 0.39 + cfg.phase * 7.30) * 0.11;

      light.position.set(cfg.anchor[0] + driftX, rise, cfg.anchor[1] + driftZ);
      light.intensity = 0.38 * vis;
    });
  });

  return (
    <>
      {PORTRAIT_CONFIGS.map((cfg, i) => (
        <pointLight
          key={cfg.name}
          ref={(el: THREE.PointLight | null) => { lightsRef.current[i] = el; }}
          color={cfg.tint}
          intensity={0}
          distance={5.0}
          decay={2}
        />
      ))}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 10. ROOT EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Drop `<FloatingShapes />` directly inside your `<Canvas>` tree.
 * No props needed — all configuration is in PORTRAIT_CONFIGS above.
 *
 * Ensure the following are installed:
 *   npm install @react-three/fiber @react-three/drei three
 *
 * @example
 * ```tsx
 * // app/page.tsx
 * import { Canvas } from '@react-three/fiber';
 * import { FloatingShapes } from '@/components/FloatingShapes';
 *
 * export default function Home() {
 *   return (
 *     <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
 *       <ambientLight intensity={0.3} />
 *       <FloatingShapes />
 *     </Canvas>
 *   );
 * }
 * ```
 */
export function FloatingShapes() {
  return (
    <>
      {/* Coloured scene lights that follow each portrait */}
      {STYLE.showLights ? <AmbientInspirationLights /> : null}

      {/* Portrait bubble assemblies */}
      {PORTRAIT_CONFIGS.map((config, index) => (
        <FloatingInspiration
          key={config.name}
          {...config}
          index={index}
        />
      ))}
    </>
  );
}

export default FloatingShapes;