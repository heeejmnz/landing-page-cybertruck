import { PerspectiveCamera } from "@react-three/drei";

export function Camera() {
  return (
    <PerspectiveCamera
      name="camera"
      makeDefault
      position={[0, 0, 10]}
      fov={30}
    />
  );
}
