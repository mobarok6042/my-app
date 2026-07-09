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
  gitIcon
];

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
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshBasicMaterial
          color="#4f46e5"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

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
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={2} />

        <Globe />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
        />
      </Canvas>
    </div>
  );
}