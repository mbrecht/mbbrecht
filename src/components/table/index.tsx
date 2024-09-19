import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Table() {
  const gltf = useLoader(GLTFLoader, "/Table_Chair_01.gltf");
  return (
    <mesh>
      <primitive object={gltf.scene} />
    </mesh>
  );
}
