import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Cybertruck } from "./Cybertruck";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Environment,
  ContactShadows,
  Center,
  useAspect,
  Image,
  Resize,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { easing } from "maath";

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
      <CameraRig />
      <Environment preset="city" />
    </Canvas>
  );
}

function CameraRig() {
  const [active, setActive] = useState(
    window.matchMedia("(max-width: 720px)").matches,
  );
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        8 + (state.pointer.x * state.viewport.width) / 4 - 8,
        (0.4 + state.pointer.y) / 2,
        active ? 7 : 5,
      ],
      0.2,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Content() {
  const { width: w, height: h } = useThree((state) => state.viewport);
  const [active, setActive] = useState(
    window.matchMedia("(max-width: 720px)").matches,
  );
  useEffect(() => {
    const handleResize = () => {
      if (active) {
        window.location.reload();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);
  const { viewport } = useThree();

  return (
    <Center position={[0, active ? 0.8 : 1.2, 0]}>
      <Resize
        width
        height
        scale={
          (active ? viewport.width / 9 : viewport.width / 5) *
          (active ? 5 : 1.5)
        }
      >
        <Cybertruck />
        <Image
          url="/logo-cybertruck.png"
          transparent
          opacity={0.8}
          position={[0, 1.2, -1]}
          scale={[w / 2, h / 2 - (active ? 1.2 : 0.8)]}
        />
      </Resize>
      <ContactShadows position={[0, 0, 0]} scale={20} blur={1} far={1} />
    </Center>
  );
}
