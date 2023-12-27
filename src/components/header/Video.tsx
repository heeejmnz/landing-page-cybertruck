type VideoTextureProps = {
  unsuspend?: "canplay" | "canplaythrough" | "loadedmetadata";
  muted?: boolean;
  loop?: boolean;
  start?: boolean;
  crossOrigin?: string;
};

import { useVideoTexture, useTexture } from "@react-three/drei";

export function Video() {
  const texture = useVideoTexture("/video.mp4", {
    start: true,
    loop: true,
    unsuspend: "canplay",
  });
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
