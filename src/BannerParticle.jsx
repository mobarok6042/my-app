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
    let stars = [];

    const mouse = { x: -1, y: -1, active: false };
    const isLightTheme = theme === "light";

    const createStars = () => {
      stars = Array.from({ length: 10 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.7,
        vx: 2.2 + Math.random() * 1.2,
        vy: 3.0 + Math.random() * 1.4,
        size: 1.1 + Math.random() * 1.4,
        opacity: isLightTheme ? 0.6 + Math.random() * 0.25 : 0.35 + Math.random() * 0.35,
        drift: 0.01 + Math.random() * 0.02,
        life: Math.random() * 0.8 + 0.4,
        spawnDelay: Math.random() * 1200 + 400,
        age: Math.random() * 1200,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rect = canvas.getBoundingClientRect();
      createStars();
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

      stars.forEach((star) => {
        star.age += 1;
        if (star.age < star.spawnDelay) return;

        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160 && dist > 0) {
            const force = (160 - dist) / 160 * 0.03;
            star.vx += (dx / dist) * force;
            star.vy += (dy / dist) * force;
          }
        }

        star.x += star.vx * 0.6;
        star.y += star.vy * 0.6;
        star.vx *= 0.997;
        star.vy *= 0.997;
        star.x += Math.sin(star.y * 0.01) * star.drift;
        star.life -= 0.0015;

        if (star.x < -80 || star.y > height + 80 || star.life <= 0) {
          star.x = Math.random() * width * 0.8 + width * 0.1;
          star.y = -40 - Math.random() * 80;
          star.vx = 2.2 + Math.random() * 1.2;
          star.vy = 3.0 + Math.random() * 1.4;
          star.size = 1.1 + Math.random() * 1.4;
          star.opacity = isLightTheme ? 0.6 + Math.random() * 0.25 : 0.35 + Math.random() * 0.35;
          star.drift = 0.01 + Math.random() * 0.02;
          star.life = Math.random() * 0.8 + 0.4;
          star.spawnDelay = Math.random() * 1400 + 600;
          star.age = 0;
        }

        const tailLength = 48 + star.size * 22;
        const tailX = star.x - star.vx * tailLength;
        const tailY = star.y - star.vy * tailLength;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        const color = isLightTheme ? "rgba(255,255,255,0.92)" : "rgba(248,250,252,0.95)";
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, 10 + star.size * 4);
        glow.addColorStop(0, `rgba(255,255,255,${star.opacity})`);
        glow.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 4 + star.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
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
