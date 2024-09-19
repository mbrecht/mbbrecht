"use client";

import { canvas, scene } from "./styles";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Table from "@/components/table";

function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial color="#00ffa3" />
    </mesh>
  );
}

function Floor({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y, z]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={0xffff00} />
    </mesh>
  );
}

export default function Home() {
  return (
    <div className={scene}>
      <Canvas
        shadows
        className={canvas}
        camera={{ fov: 45, position: [0, 0, 20], near: 0.1, far: 100 }}
      >
        <pointLight
          color={0xffffff}
          position={[0, 10, 10]}
          intensity={2}
          decay={0.2}
        />
        <Sphere />
        <Table />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
