"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Central 3D Interactive Core
function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerCageRef = useRef<THREE.Mesh>(null!);
  const innerCoreRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current || !outerCageRef.current || !groupRef.current) return;

    // Continuous smooth organic rotation
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;

    outerCageRef.current.rotation.x -= delta * 0.15;
    outerCageRef.current.rotation.y += delta * 0.22;

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y += delta * 0.4;
      innerCoreRef.current.rotation.z += delta * 0.25;
    }

    // Dynamic mouse responsiveness with smooth lerping
    const targetX = mouse.x * 0.6;
    const targetY = mouse.y * 0.6;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.5,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * 0.6,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Outer Crystalline Geometric Wireframe Cage */}
      <mesh ref={outerCageRef} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#00f2fe"
          wireframe
          transparent
          opacity={0.32}
          emissive="#00f2fe"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Pulsing Organic Distorted Metal Core */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh ref={meshRef} scale={1.2}>
          <octahedronGeometry args={[1, 2]} />
          <MeshDistortMaterial
            color="#080f1d"
            roughness={0.15}
            metalness={0.9}
            distort={0.38}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Inner Radiant Energy Spheres */}
      <mesh ref={innerCoreRef} scale={0.65}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#00ff87"
          emissive="#00ff87"
          emissiveIntensity={1.8}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

// Interactive Network Topology & Floating Data Nodes
function NetworkTopology() {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  const nodeCount = 28;
  const nodes = useMemo(() => {
    const list: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi) * 0.9;
      const z = radius * Math.sin(theta) * Math.cos(phi) * 0.6;

      list.push(new THREE.Vector3(x, y, z));
    }
    return list;
  }, []);

  const linePositions = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 2.2) {
          lines.push(nodes[i].x, nodes[i].y, nodes[i].z);
          lines.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }
    return new Float32Array(lines);
  }, [nodes]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.25,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouse.x * 0.2,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      {/* Network Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f2fe"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Floating Microservice Cubes */}
      {nodes.map((pos, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={pos}>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial
              color={idx % 2 === 0 ? "#00f2fe" : "#00ff87"}
              emissive={idx % 2 === 0 ? "#00f2fe" : "#00ff87"}
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Surrounding Particle Dust Field
function ParticleField({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const color1 = new THREE.Color("#00f2fe");
    const color2 = new THREE.Color("#00ff87");
    const color3 = new THREE.Color("#38bdf8");

    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 6.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi) - 0.5;

      const mixedColor =
        Math.random() > 0.6 ? color1 : Math.random() > 0.3 ? color2 : color3;

      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    return [pos, cols];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -mouse.y * 0.12,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.4} color="#00ff87" />
        <directionalLight position={[0, 5, 5]} intensity={1.0} />

        <FloatingCore />
        <NetworkTopology />
        <ParticleField count={450} />
      </Canvas>
    </div>
  );
}
