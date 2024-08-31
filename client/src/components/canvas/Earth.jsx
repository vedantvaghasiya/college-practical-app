import React, { useEffect, useRef ,Suspense} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");
  const earthRef = useRef();

  useEffect(() => {
    let animationId;

    const animateEarth = () => {
      if (earthRef.current) { // Check if earthRef.current is defined
        earthRef.current.rotation.y += 0.001;
      }
      animationId = requestAnimationFrame(animateEarth);
    };

    animateEarth(); // Start the animation when the component mounts

    // Clear the animation when the component unmounts
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <primitive ref={earthRef} object={earth.scene} scale={3} position-y={0} />
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Suspense fallback={<CanvasLoader />}>
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
