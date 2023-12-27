import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as GLTFLIB from "three-stdlib";
import { useThree } from "@react-three/fiber";

type GLTFResult = GLTFLIB.GLTF & {
  nodes: {
    interior003: THREE.Mesh;
    interior003_1: THREE.Mesh;
    interior003_2: THREE.Mesh;
    interior003_3: THREE.Mesh;
    interior003_4: THREE.Mesh;
    interior003_5: THREE.Mesh;
    steer: THREE.Mesh;
    tires: THREE.Mesh;
  };
  materials: {
    ["gray.002"]: THREE.MeshStandardMaterial;
    ["light_f.002"]: THREE.MeshStandardMaterial;
    ["body.002"]: THREE.MeshStandardMaterial;
    glass_crack: THREE.MeshStandardMaterial;
    ["glassgray.002"]: THREE.MeshStandardMaterial;
    Light: THREE.MeshStandardMaterial;
    ["rubber.002"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function Cybertruck(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/modelo-3d/cybertruck.gltf",
  ) as GLTFResult;

  return (
    <group {...props} dispose={null} rotation={[0, 1.5, 0]} scale={0.5}>
      <mesh
        geometry={nodes.steer.geometry}
        material={materials["gray.002"]}
        material-color="black"
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.tires.geometry}
        material={materials["rubber.002"]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003.geometry}
        material={materials["gray.002"]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003_1.geometry}
        material={materials["light_f.002"]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003_2.geometry}
        material={materials["body.002"]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003_3.geometry}
        material={materials.glass_crack}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003_4.geometry}
        material={materials["glassgray.002"]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.interior003_5.geometry}
        material={materials.Light}
        castShadow
        receiveShadow
      />
    </group>
  );
}

useGLTF.preload("/modelo-3d/cybertruck.gltf");
