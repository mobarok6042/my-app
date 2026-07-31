import { useEffect, useRef } from "react";

export default function ParticleBackground({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let frameId;
    let rect = null;

    const mouse = { x: 0, y: 0, active: false };
    const isLightTheme = theme === "light";
    const particleCount = 260;
    let particles = [];

    const createParticles = () => {
      particles = Array.from({ length: particleCount }, () => {
        const homeX = Math.random() * width;
        const homeY = Math.random() * height;

        return {
          x: homeX,
          y: homeY,
          homeX,
          homeY,
          vx: (Math.random() - 0.5) * 0.025,
          vy: (Math.random() - 0.5) * 0.025,
          radius: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.55 + 0.2,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.045 + 0.015,
        };
      });
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = canvas.getBoundingClientRect();
      createParticles();
    };

    const handlePointerMove = (event) => {
      if (!rect) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      const drag = 0.92;
      const returnStrength = 0.035;
      const repulsionStrength = 0.06;
      const influenceRadius = Math.min(width, height) * 0.16;

      particles.forEach((particle) => {
        if (mouse.active) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < influenceRadius && dist > 0) {
            const force = ((influenceRadius - dist) / influenceRadius) * repulsionStrength;
            const angle = Math.atan2(dy, dx);
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        } else {
          particle.vx += (particle.homeX - particle.x) * 0.00018;
          particle.vy += (particle.homeY - particle.y) * 0.00018;
          particle.x += (particle.homeX - particle.x) * returnStrength;
          particle.y += (particle.homeY - particle.y) * returnStrength;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        particle.vx *= drag;
        particle.vy *= drag;

        const twinkle = 0.55 + 0.45 * Math.sin(time * 0.001 * particle.twinkleSpeed + particle.twinkleOffset);
        const glowRadius = particle.radius * (2.2 + twinkle * 1.8);
        const px = particle.x;
        const py = particle.y;
        const baseAlpha = Math.min(0.95, Math.max(0.12, particle.alpha * (0.8 + twinkle * 0.4)));
        const [r, g, b] = isLightTheme ? [15, 23, 42] : [220, 240, 255];
        const alphaScale = isLightTheme ? 0.95 : 1;
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowRadius * 2.3);

        gradient.addColorStop(0, `rgba(${r},${g},${b},${baseAlpha * alphaScale})`);
        gradient.addColorStop(0.4, `rgba(${r},${g},${b},${baseAlpha * 0.45 * alphaScale})`);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.save();
        ctx.globalCompositeOperation = isLightTheme ? "source-over" : "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, glowRadius * 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const animate = (time) => {
      draw(time);
      frameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseout", handlePointerLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseout", handlePointerLeave);
      cancelAnimationFrame(frameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="particle-bg" aria-hidden="true" />;
}
