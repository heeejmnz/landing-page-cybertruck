import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Cybertruck } from "./Cybertruck";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Text,
  Center,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { easing } from "maath";
import type { color } from "three/examples/jsm/nodes/Nodes.js";

export function Scene() {
  return (
    <Canvas shadows>
      <Lights />
      <Camera />
      <Content />
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={0.25}
        />
      </EffectComposer>
      <OrbitControls />
      <CameraRig />
      <Environment preset="city" />
    </Canvas>
  );
}

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        8 + (state.pointer.x * state.viewport.width) / 4 - 8,
        (0 + state.pointer.y) / 2,
        5,
      ],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Content() {
  return (
    <>
      <Center position={[0, 0.3, 0]}>
        <Text
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          position={[0, 1.2, -0.5]}
          fontSize={0.4}
        >
          CyberTruck
        </Text>
        <Cybertruck />
        <ContactShadows position={[0, 0, 0]} scale={14} blur={2} far={2} />
      </Center>
    </>
  );
}
