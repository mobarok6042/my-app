/**

 * TechGlobe — 3D draggable tech-stack globe for React portfolios.

 *

 * Drop into any React (Vite / Next / CRA) project with `three` installed.

 * Requires the matching `TechGlobe.css` stylesheet.

 *

 *   npm install three

 *

 * Public API:

 *   <TechGlobe techs={[...]}

 *              accentA="#9b87ff"

 *              accentB="#67e8f9"

 *              onIconClick={(name) => {}}

 *              style={{ height: 600 }}

 *   />

 *

 * To force a rebuild when props change, change the `key` on the component.

 */

import { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';

import './TechGlobe.css';


/* ----------------------------------------------------------------

   Default tech stack — replace via the `techs` prop to customize.

   Icons come from the devicons CDN. Swap `url` to a local path

   to self-host (see README).

---------------------------------------------------------------- */

const DEFAULT_TECHS = [

  { name: 'React',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },

  { name: 'HTML5',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },

  { name: 'CSS3',       url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },

  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },

  { name: 'MongoDB',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },

  { name: 'Firebase',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },

  { name: 'Tailwind',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },

  { name: 'Node.js',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },

  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },

  { name: 'Next.js',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },

  { name: 'Git',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },

  { name: 'Python',     url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },

  { name: 'Docker',     url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },

  { name: 'GraphQL',    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },

  { name: 'Figma',      url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },

  { name: 'Vue',        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },

  { name: 'Vercel',     url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },

  { name: 'Postgres',   url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },

];


/* Uniformly distribute N points on a sphere using the golden-angle spiral. */

function fibonacciPositions(n, radius) {

  const phi = Math.PI * (3 - Math.sqrt(5));

  const pts = [];

  for (let i = 0; i < n; i++) {

    const y = 1 - (i / Math.max(1, n - 1)) * 2;

    const r = Math.sqrt(1 - y * y);

    const theta = phi * i;

    pts.push(new THREE.Vector3(

      Math.cos(theta) * r * radius,

      y * radius,

      Math.sin(theta) * r * radius,

    ));

  }

  return pts;

}


/* ----------------------------------------------------------------

   GLSL shaders — globe dot pattern + inner glow

---------------------------------------------------------------- */

const GLOBE_VERT = /* glsl */ `

  varying vec3 vNormalW;

  varying vec2 vUv;

  void main() {

    vUv = uv;

    vNormalW = normalize(mat3(modelMatrix) * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  }

`;


const GLOBE_FRAG = /* glsl */ `

  precision highp float;

  varying vec3 vNormalW;

  varying vec2 vUv;

  uniform vec3 uColorA;

  uniform vec3 uColorB;

  uniform float uOpacity;

  void main() {

    float cols = 64.0;

    float rows = 48.0;

    vec2 cell = vec2(cols, rows);

    vec2 g = abs(fract(vUv * cell) - 0.5);

    float dotMask = smoothstep(0.42, 0.5, max(g.x, g.y));

    vec3 viewDir = normalize(cameraPosition - (modelMatrix * vec4(0.0)).xyz);

    float facing = clamp(dot(vNormalW, viewDir), 0.0, 1.0);

    float rim = pow(1.0 - facing, 1.6);

    vec3 base = mix(uColorA, uColorB, vUv.y * 0.9 + 0.1);

    vec3 col = base * (0.55 + 0.45 * facing) + rim * 0.6;

    float a = dotMask * uOpacity;

    if (a < 0.01) discard;

    gl_FragColor = vec4(col, a);

  }

`;


const GLOW_VERT = /* glsl */ `

  varying vec3 vN;

  void main() {

    vN = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  }

`;


const GLOW_FRAG = /* glsl */ `

  varying vec3 vN;

  uniform vec3 uColor;

  void main() {

    float f = pow(0.65 - dot(vN, vec3(0.0, 0.0, 1.0)), 2.4);

    gl_FragColor = vec4(uColor, 1.0) * f;

  }

`;


/* ----------------------------------------------------------------

   Component

---------------------------------------------------------------- */

export default function TechGlobe({

  techs = DEFAULT_TECHS,

  accentA = '#9b87ff',

  accentB = '#67e8f9',

  iconRadius = 1.4,

  globeRadius = 1,

  fov = 50,

  cameraZ = 3.6,

  idleSpin = 0.0018,

  dragSens = 0.0055,

  momDecay = 0.945,

  iconSize = 60,             // px — must match the .tg-icon size in CSS

  showHint = true,

  onIconClick,

  className = '',

  style,

}) {

  const wrapperRef   = useRef(null);

  const canvasRef    = useRef(null);

  const iconsLayerRef = useRef(null);


  /* Mutable runtime state — survives re-renders, no extra re-render triggered. */

  const state = useRef({

    scene: null, camera: null, renderer: null, group: null,

    iconPositions: [], iconEls: [],

    isDragging: false, prevX: 0, prevY: 0,

    velX: 0, velY: 0,

    rafId: 0,

  }).current;


  /* Keep latest onIconClick available inside non-React event listeners. */

  const onIconClickRef = useRef(onIconClick);

  useEffect(() => { onIconClickRef.current = onIconClick; }, [onIconClick]);


  const [hasInteracted, setHasInteracted] = useState(false);


  /* ----------------------------------------------------------------

     Set up three.js + DOM icons. Runs once on mount.

     To force a rebuild (e.g. when `techs` changes meaningfully),

     change the `key` prop on the component.

  ---------------------------------------------------------------- */

  useEffect(() => {

    const wrapper    = wrapperRef.current;

    const canvas     = canvasRef.current;

    const iconsLayer = iconsLayerRef.current;

    if (!wrapper || !canvas || !iconsLayer) return;


    /* --- three.js scene --- */

    const scene  = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);

    camera.position.set(0, 0, cameraZ);


    const renderer = new THREE.WebGLRenderer({

      canvas,

      antialias: true,

      alpha: true,

      powerPreference: 'high-performance',

    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    const group = new THREE.Group();

    scene.add(group);


    /* globe */

    const globe = new THREE.Mesh(

      new THREE.SphereGeometry(globeRadius, 96, 96),

      new THREE.ShaderMaterial({

        transparent: true,

        depthWrite: false,

        uniforms: {

          uColorA:  { value: new THREE.Color(accentA) },

          uColorB:  { value: new THREE.Color(accentB) },

          uOpacity: { value: 0.85 },

        },

        vertexShader: GLOBE_VERT,

        fragmentShader: GLOBE_FRAG,

      }),

    );

    group.add(globe);


    /* inner glow */

    group.add(new THREE.Mesh(

      new THREE.SphereGeometry(globeRadius * 0.95, 32, 32),

      new THREE.ShaderMaterial({

        transparent: true,

        depthWrite: false,

        blending: THREE.AdditiveBlending,

        side: THREE.BackSide,

        uniforms: { uColor: { value: new THREE.Color(accentA) } },

        vertexShader: GLOW_VERT,

        fragmentShader: GLOW_FRAG,

      }),

    ));


    state.scene    = scene;

    state.camera   = camera;

    state.renderer = renderer;

    state.group    = group;


    /* --- icon DOM --- */

    state.iconPositions = fibonacciPositions(techs.length, iconRadius);

    state.iconEls = techs.map((tech) => {

      const el = document.createElement('div');

      el.className = 'tg-icon';

      el.style.setProperty('--tg-color', tech.color || '#ffffff');

      el.dataset.tech = tech.name;


      const img = document.createElement('img');

      img.alt   = tech.name;

      img.src   = tech.url;

      img.loading = 'lazy';

      img.draggable = false;

      el.appendChild(img);


      const tip = document.createElement('div');

      tip.className = 'tg-tooltip';

      tip.textContent = tech.name;

      el.appendChild(tip);


      iconsLayer.appendChild(el);


      el.addEventListener('pointerenter', () => tip.classList.add('show'));

      el.addEventListener('pointerleave', () => tip.classList.remove('show'));

      el.addEventListener('click', () => onIconClickRef.current?.(tech.name, tech));


      return el;

    });


    /* --- sizing --- */

    const onResize = () => {

      const w = wrapper.clientWidth;

      const h = wrapper.clientHeight;

      renderer.setSize(w, h, false);

      camera.aspect = w / h;

      camera.updateProjectionMatrix();

    };

    const ro = new ResizeObserver(onResize);

    ro.observe(wrapper);

    onResize();


    /* --- drag handlers (mouse + touch + pen) --- */

    const onDown = (e) => {

      state.isDragging = true;

      state.prevX = e.clientX;

      state.prevY = e.clientY;

      state.velX = state.velY = 0;

      try { wrapper.setPointerCapture?.(e.pointerId); } catch (_) {}

      if (!hasInteracted) setHasInteracted(true);

    };

    const onMove = (e) => {

      if (!state.isDragging) return;

      const dx = e.clientX - state.prevX;

      const dy = e.clientY - state.prevY;

      state.velY = dx * dragSens;

      state.velX = dy * dragSens;

      state.group.rotation.y += state.velY;

      state.group.rotation.x += state.velX;

      state.prevX = e.clientX;

      state.prevY = e.clientY;

    };

    const onUp = (e) => {

      state.isDragging = false;

      try { wrapper.releasePointerCapture?.(e.pointerId); } catch (_) {}

    };


    wrapper.addEventListener('pointerdown', onDown);

    window.addEventListener('pointermove', onMove);

    window.addEventListener('pointerup', onUp);

    window.addEventListener('pointercancel', onUp);


    /* --- animation loop --- */

    const _world     = new THREE.Vector3();

    const _outward   = new THREE.Vector3();

    const _iconToCam = new THREE.Vector3();

    const _projected = new THREE.Vector3();


    const tick = () => {

      state.rafId = requestAnimationFrame(tick);

      const { group, camera, iconPositions, iconEls, isDragging } = state;


      if (!isDragging) {

        state.velX *= momDecay;

        state.velY *= momDecay;

        if (Math.abs(state.velX) > 1e-5) group.rotation.x += state.velX;

        if (Math.abs(state.velY) > 1e-5) group.rotation.y += state.velY;

        if (Math.abs(state.velX) < 1e-5 && Math.abs(state.velY) < 1e-5) {

          group.rotation.y += idleSpin;

        }

      }


      group.updateMatrixWorld(true);


      const w = wrapper.clientWidth;

      const h = wrapper.clientHeight;


      for (let i = 0; i < iconPositions.length; i++) {

        _world.copy(iconPositions[i]).applyMatrix4(group.matrixWorld);

        _outward.copy(_world).normalize();

        _iconToCam.subVectors(camera.position, _world).normalize();

        const facing = _outward.dot(_iconToCam); // [-1, 1]


        _projected.copy(_world).project(camera);

        const sx = (_projected.x * 0.5 + 0.5) * w;

        const sy = (-_projected.y * 0.5 + 0.5) * h;


        const t = THREE.MathUtils.smoothstep(facing, -0.5, 0.55);

        const opacity = 0.16 + t * 0.84;

        const scale   = 0.6  + t * 0.5;


        const el = iconEls[i];

        el.style.transform =

          `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;

        el.style.opacity = opacity.toFixed(3);

        el.style.setProperty('--tg-tx', `${sx.toFixed(1)}px`);

        el.style.setProperty('--tg-ty', `${sy.toFixed(1)}px`);

        el.style.zIndex = t > 0.5 ? '3' : '2';

      }


      renderer.render(scene, camera);

    };

    state.rafId = requestAnimationFrame(tick);


    /* --- cleanup --- */

    return () => {

      cancelAnimationFrame(state.rafId);

      ro.disconnect();

      window.removeEventListener('pointermove', onMove);

      window.removeEventListener('pointerup', onUp);

      window.removeEventListener('pointercancel', onUp);


      renderer.dispose();

      scene.traverse((obj) => {

        if (obj.geometry) obj.geometry.dispose();

        if (obj.material) {

          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());

          else obj.material.dispose();

        }

      });

      state.iconEls.forEach((el) => el.remove());

      state.iconEls = [];

      state.iconPositions = [];

    };

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []); // intentionally empty — key the component to rebuild


  return (

    <div

      ref={wrapperRef}

      className={`tg-stage ${className}`}

      style={style}

      role="presentation"

      tabIndex={-1}

    >

      <canvas ref={canvasRef} className="tg-canvas" />

      <div ref={iconsLayerRef} className="tg-icons-layer" />

      {showHint && (

        <div className={`tg-hint ${hasInteracted ? 'tg-hide' : ''}`}>

          Drag with your mouse — rotate freely in any direction

        </div>

      )}

    </div>

  );

}


/* Tiny export so consumers can read the defaults if they want to extend them. */

export { DEFAULT_TECHS };

