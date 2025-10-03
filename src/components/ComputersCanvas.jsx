import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

function usePulse(speed = 2, min = 0.6, max = 1.6) {
  const t = useRef(0);
  const val = useRef(min);
  useFrame((_, delta) => {
    t.current += delta * speed;
    const s = (Math.sin(t.current) + 1) / 2;
    val.current = min + (max - min) * s;
  });
  return val;
}

const COLORS = {
  neonCyan: '#00d9ff',
  deepBlue: '#0a1a2f',
  darkGray: '#1a1f2e',
  black: '#000000',
  white: '#ffffff',
  purple: '#a855f7',
  orange: '#ff8c00',
  woodOrange: '#d97706',
};

const NeonParticles = () => {
  const group = useRef();
  const positions = useMemo(() =>
    new Array(100).fill(0).map(() => [
      (Math.random() - 0.5) * 8,
      Math.random() * 3,
      (Math.random() - 0.5) * 5
    ]), []);

  useFrame((_, d) => {
    if (!group.current) return;
    group.current.children.forEach((m) => {
      m.position.y += d * 0.15;
      if (m.position.y > 3) m.position.y = -0.2;
    });
  });

  return (
    <group ref={group}>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial
            emissive={COLORS.neonCyan}
            emissiveIntensity={2}
            color="#000"
          />
        </mesh>
      ))}
    </group>
  );
};

const Monitor = ({ isMobile }) => {
  const group = useRef();
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
  });

  const pulse = usePulse(2, 1.5, 2.2);
  const screenWidth = isMobile ? 3.0 : 4.5;
  const screenHeight = isMobile ? 1.8 : 2.8;

  const photoTex = useTexture("https://avatars.githubusercontent.com/u/160057651?s=1024&u=e1b4801ac5677f9cd2a9d8eb6a7b5a011e8f6adf&v=4");

  try {
    if (typeof photoTex.colorSpace !== 'undefined') {
      photoTex.colorSpace = 'srgb';
    } else if (typeof photoTex.encoding !== 'undefined') {
      import('three').then((THREE) => {
        try {
          photoTex.encoding = THREE.sRGBEncoding;
        } catch (e) {
        }
        photoTex.generateMipmaps = true;
        photoTex.needsUpdate = true;
      }).catch(() => {
        photoTex.generateMipmaps = true;
        photoTex.needsUpdate = true;
      });
    } else {
      photoTex.generateMipmaps = true;
      photoTex.needsUpdate = true;
    }
  } catch (e) {
  }

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      <mesh castShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[screenWidth, screenHeight, 0.06]} />
        <meshStandardMaterial
          color={COLORS.black}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Display content */}
      <mesh position={[0, 1.5, 0.032]}>
        <planeGeometry args={[screenWidth * 0.99, screenHeight * 0.98]} />
        <meshBasicMaterial map={photoTex} toneMapped={false} />
      </mesh>

      {/* Glowing bezel */}
      <mesh position={[0, 1.5, -0.003]}>
        <boxGeometry args={[screenWidth * 1.01, screenHeight * 1.01, 0.015]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current * 1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Chin */}
      <mesh castShadow position={[0, 0.35, 0]}>
        <boxGeometry args={[screenWidth, 0.25, 0.06]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Stand */}
      <mesh castShadow position={[0, -0.3, -0.02]}>
        <cylinderGeometry args={[0.14, 0.2, 1.1, 16]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Base */}
      <mesh receiveShadow castShadow position={[0, -0.88, 0]}>
        <boxGeometry args={[screenWidth * 0.5, 0.06, screenWidth * 0.35]} />
        <meshStandardMaterial
          color="#e5e5e5"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

const Keyboard = () => {
  const pulse = usePulse(2, 1.2, 2.0);
  return (
    <group position={[0, -0.25, 1.3]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.06, 0.8]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[2.3, 0.015, 0.7]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current}
          color={COLORS.darkGray}
        />
      </mesh>
    </group>
  );
};

const Mouse = ({ x = 0.9 }) => (
  <group position={[x, -0.3, 0.6]}>
    <mesh castShadow>
      <capsuleGeometry args={[0.1, 0.1, 8, 16]} />
      <meshStandardMaterial
        color={COLORS.white}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  </group>
);

const CircularSpeaker = ({ x, tall = false }) => {
  const pulse = usePulse(1.5, 1.5, 2.8);

  return (
    <group position={[x, tall ? 0.6 : 0.3, -0.4]}>
      <mesh castShadow position={[0, tall ? -0.5 : -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.14, tall ? 1.0 : 0.6, 16]} />
        <meshStandardMaterial
          color={COLORS.woodOrange}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Speaker body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.24, 32]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Glowing front - bright cyan */}
      <mesh position={[0, 0, 0.13]}>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 32]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current}
          color={COLORS.neonCyan}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Point light for glow */}
      <pointLight
        color={COLORS.neonCyan}
        intensity={2.5}
        distance={2.5}
        position={[0, 0, 0.2]}
      />
    </group>
  );
};

const Drawers = () => {
  const pulse = usePulse(1.8, 1.0, 1.8);

  return (
    <group position={[-1.2, -0.75, 0.3]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.9, 1.3]} />
        <meshStandardMaterial
          color={COLORS.darkGray}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Drawers with cyan glow */}
      {[0.28, 0, -0.28].map((y, i) => (
        <mesh key={i} position={[0.41, y, 0]}>
          <boxGeometry args={[0.03, 0.24, 1.1]} />
          <meshStandardMaterial
            color={COLORS.darkGray}
            emissive={COLORS.neonCyan}
            emissiveIntensity={pulse.current}
          />
        </mesh>
      ))}
    </group>
  );
};

const PenHolder = () => (
  <group position={[1.6, -0.22, -0.3]}>
    <mesh castShadow>
      <cylinderGeometry args={[0.09, 0.09, 0.24, 16]} />
      <meshStandardMaterial color={COLORS.purple} />
    </mesh>
    {[0, 0.07, -0.07].map((x, i) => (
      <mesh key={i} position={[x, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.013, 0.013, 0.32, 8]} />
        <meshStandardMaterial color={i === 0 ? COLORS.purple : COLORS.neonCyan} />
      </mesh>
    ))}
  </group>
);

const Desk = () => {
  const pulse = usePulse(1.2, 2.0, 3.5);

  return (
    <group>
      {/* Desktop - dark surface */}
      <mesh receiveShadow position={[0, -0.35, 0]}>
        <boxGeometry args={[9.5, 0.12, 5.5]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Bright cyan glowing edges */}
      <mesh position={[0, -0.38, 2.8]}>
        <boxGeometry args={[9.6, 0.08, 0.2]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current}
          color={COLORS.neonCyan}
        />
      </mesh>

      <mesh position={[0, -0.38, -2.8]}>
        <boxGeometry args={[9.6, 0.08, 0.2]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current}
          color={COLORS.neonCyan}
        />
      </mesh>

      {/* Side edges */}
      <mesh position={[4.8, -0.38, 0]}>
        <boxGeometry args={[0.2, 0.08, 5.6]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current * 0.8}
          color={COLORS.neonCyan}
        />
      </mesh>

      <mesh position={[-4.8, -0.38, 0]}>
        <boxGeometry args={[0.2, 0.08, 5.6]} />
        <meshStandardMaterial
          emissive={COLORS.neonCyan}
          emissiveIntensity={pulse.current * 0.8}
          color={COLORS.neonCyan}
        />
      </mesh>

      {/* Powerful underglow lights */}
      <pointLight
        color={COLORS.neonCyan}
        intensity={5}
        distance={5}
        position={[0, -0.55, 2.7]}
      />
      <pointLight
        color={COLORS.neonCyan}
        intensity={5}
        distance={5}
        position={[0, -0.55, -2.7]}
      />
      <pointLight
        color={COLORS.neonCyan}
        intensity={4}
        distance={4.5}
        position={[4.5, -0.55, 0]}
      />
      <pointLight
        color={COLORS.neonCyan}
        intensity={4}
        distance={4.5}
        position={[-4.5, -0.55, 0]}
      />

      {/* Floor reflection - pure black */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.0, 0]} receiveShadow>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial
          color={COLORS.black}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handle = (e) => setIsMobile(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handle);
      return () => mediaQuery.removeEventListener("change", handle);
    } else if (mediaQuery.addListener) {
      // older browsers
      mediaQuery.addListener(handle);
      return () => mediaQuery.removeListener(handle);
    }
  }, []);

  useEffect(() => {
    // quick WebGL support check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        color: '#fff',
        padding: 16,
        borderRadius: 8,
      }}>
        <div>
          <h3 style={{ margin: 0 }}>WebGL not available</h3>
          <p style={{ marginTop: 8, color: '#ddd' }}>Your browser or device doesn't support WebGL. Try updating your browser or enabling hardware acceleration.</p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [4, 2.5, 5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={(state) => {
        console.log('Canvas created, gl:', !!state.gl);
      }}
    >
      <ambientLight intensity={0.25} />
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={0.1} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={0.6}
          castShadow
        />

        <pointLight position={[2, 2, 2]} intensity={1.5} color={COLORS.neonCyan} />
        <pointLight position={[-2, 1.5, 1]} intensity={1} color={COLORS.purple} />

        <NeonParticles />
        <Monitor isMobile={isMobile} />
        <Keyboard />
        <Mouse x={1.1} />
        <CircularSpeaker x={-3.0} tall />
        <CircularSpeaker x={3.0} tall />
        <Drawers />
        <PenHolder />
        <Desk />

        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
