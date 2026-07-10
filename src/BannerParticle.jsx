import { useEffect, useRef } from "react";

export default function BannerParticle({ theme }) {
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

    const orb = {
      x: 0.45,
      y: 0.4,
      vx: 0.0008,
      vy: 0.0006,
      radius: 0.12,
    };

    const mouse = { x: -1, y: -1, active: false };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = canvas.getBoundingClientRect();
    };

    const handleMouseMove = (event) => {
      if (!rect) return;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      mouse.x = x;
      mouse.y = y;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      orb.x += orb.vx;
      orb.y += orb.vy;

      if (orb.x < -0.2) orb.x = 1.2;
      if (orb.x > 1.2) orb.x = -0.2;
      if (orb.y < -0.2) orb.y = 1.2;
      if (orb.y > 1.2) orb.y = -0.2;

      const px = orb.x * width;
      const py = orb.y * height;
      const r = Math.min(width, height) * orb.radius;
      const themeColor = theme === "light" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.22)";
      const inner = ctx.createRadialGradient(px, py, 0, px, py, r);
      inner.addColorStop(0, themeColor);
      inner.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = inner;
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = theme === "light" ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(px, py, r * 1.5, 0, Math.PI * 2);
      ctx.stroke();

      if (mouse.active) {
        const dx = px - mouse.x;
        const dy = py - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = Math.max(width, height) * 0.18;
        if (dist < minDist) {
          const angle = Math.atan2(dy, dx);
          const force = (minDist - dist) / minDist * 0.08;
          orb.vx += Math.cos(angle) * force;
          orb.vy += Math.sin(angle) * force;
        }
      }
    };

    const render = () => {
      draw();
      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    frameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="banner-particle-canvas" aria-hidden="true" />;
}
