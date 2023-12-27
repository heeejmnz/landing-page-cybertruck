import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Cybertruck } from "./Cybertruck";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import {
  Environment,
  ContactShadows,
  Center,
  useAspect,
  Image,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";
import { Video } from "./Video";

export function Scene() {
  return (
    <Canvas shadows>
      <Lights />
      <Camera />
      <Content />
      {/* <mesh */}
      {/*   scale={1} */}
      {/*   position={[-2, 0.5, -0.6]} */}
      {/*   rotation={[0, 0.5, 0]} */}
      {/* > */}
      {/*   <planeGeometry width={1070} height={1000} /> */}
      {/*   <Suspense fallback={<meshBasicMaterial wireframe />}> */}
      {/*     <Video /> */}
      {/*   </Suspense> */}
      {/* </mesh> */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={0.25}
        />
      </EffectComposer>
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
        (0.4 + state.pointer.y) / 2,
        5,
      ],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Content() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  return (
    <>
      <Center position={[0, 0.4, 0]}>
        <Cybertruck />
        <Image
          url="/logo-cybertruck.png"
          transparent
          opacity={0.8}
          position={[0, 1.2, -1]}
          scale={[w / 2, h / 2]}
        />
        <ContactShadows position={[0, 0, 0]} scale={14} blur={2} far={2} />
      </Center>
    </>
  );
}
