import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";
import { useMemo, useRef } from "react";

import reactIcon from "./assets/icons/react.png";
import jsIcon from "./assets/icons/javascript.png";
import tsIcon from "./assets/icons/typescript.png";
import htmlIcon from "./assets/icons/html5.png";
import cssIcon from "./assets/icons/css3.png";
import tailwindIcon from "./assets/icons/tailwindcss.png";
import firebaseIcon from "./assets/icons/firebase.png";
import mongodbIcon from "./assets/icons/mongodb.png";
import nodeIcon from "./assets/icons/nodejs.png";
import expressIcon from "./assets/icons/express.png";
import gitIcon from "./assets/icons/git.png";

const icons = [
  reactIcon,
  jsIcon,
  tsIcon,
  htmlIcon,
  cssIcon,
  tailwindIcon,
  firebaseIcon,
  mongodbIcon,
  nodeIcon,
  expressIcon,
  gitIcon,
];

// Fibonacci Sphere
function fibonacciSphere(count, radius = 2.2) {
  const points = [];

  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);

    const phi = i * increment;

    points.push([
      Math.cos(phi) * r * radius,
      y * radius,
      Math.sin(phi) * r * radius,
    ]);
  }

  return points;
}

function Icon({ position, image }) {
  const texture = useLoader(TextureLoader, image);

  texture.anisotropy = 16;

  return (
    <sprite position={position} scale={[0.45, 0.45, 0.45]}>
      <spriteMaterial map={texture} transparent />
    </sprite>
  );
}

function Globe() {
  const group = useRef();

  const positions = useMemo(() => fibonacciSphere(icons.length), []);

  useFrame((_, delta) => {
    if (!group.current) return;

    // Continuous rotation on every axis
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.x += delta * 0.08;
    group.current.rotation.z += delta * 0.03;
  });

  return (
    <group ref={group}>
      {/* Globe */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial
          color="#4f46e5"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Icons */}
      {icons.map((icon, index) => (
        <Icon
          key={index}
          image={icon}
          position={positions[index]}
        />
      ))}
    </group>
  );
}

export default function TechGlobe() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>

        {/* Lights */}
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* Globe */}
        <Globe />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}

          enableDamping
          dampingFactor={0.08}

          rotateSpeed={1}

          // Allow full vertical rotation
          minPolarAngle={0}
          maxPolarAngle={Math.PI}

          autoRotate={false}
        />

      </Canvas>
    </div>
  );
}