"use client";

import { canvas, scene } from "./styles";
import { Canvas, Vector3 } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Sphere() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial color="#00ffa3" />
    </mesh>
  );
}

function Floor({ position }: { position?: Vector3 }) {
  return (
    <mesh position={position}>
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
      </Canvas>
    </div>
  );
}
