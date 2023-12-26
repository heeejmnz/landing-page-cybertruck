export function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight color="white" position={[0, 13, 10]} intensity={0.1} />
      <directionalLight color="white" position={[-30, 13, 0]} intensity={0.1} />
      <directionalLight color="white" position={[20, 13, 0]} intensity={0.1} />
      <directionalLight color="white" position={[0, 13, -30]} intensity={0.1} />
      <directionalLight color="white" position={[0, 13, -5]} intensity={0.1} />
    </>
  );
}
