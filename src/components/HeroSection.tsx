import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll-triggered transitions
  const mode = useTransform(scrollYProgress, [0, 0.5], ["Away", "Home"]);
  const lightIntensity = useTransform(scrollYProgress, [0, 1], [0.2, 0.8]);
  const timeDisplay = useTransform(scrollYProgress, [0, 1], [17, 22]); // 17:00 to 22:00

  const [currentTime, setCurrentTime] = useState("17:00");
  const [currentMode, setCurrentMode] = useState("Away");

  useEffect(() => {
    return timeDisplay.on("change", (v) => {
      const hours = Math.floor(v);
      const minutes = Math.floor((v % 1) * 60);
      setCurrentTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
    });
  }, [timeDisplay]);

  useEffect(() => {
    return mode.on("change", (v) => setCurrentMode(v));
  }, [mode]);

  // Animated dust particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number, y: number, radius: number, vx: number, vy: number, alpha: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400; // Hero height
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2 - 0.1, // slightly moving up
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    const style = getComputedStyle(document.documentElement);
    const orangeColor = style.getPropertyValue('--theme-orange').trim() || '#D98A6C';
    const bgColor = style.getPropertyValue('--theme-bg').trim() || '#F8F6F3';

    // Parse hex to rgb for rgba usage
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 217, g: 138, b: 89 };
    };

    const orangeRgb = hexToRgb(orangeColor);
    const bgRgb = hexToRgb(bgColor);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Light rays effect based on scroll
      const intensity = lightIntensity.get();
      const gradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
      gradient.addColorStop(0, `rgba(${orangeRgb.r}, ${orangeRgb.g}, ${orangeRgb.b}, ${intensity * 0.3})`);
      gradient.addColorStop(1, `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, 0)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${orangeRgb.r}, ${orangeRgb.g}, ${orangeRgb.b}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lightIntensity]);

  // Interactive presence detection
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] overflow-hidden bg-bg border-b border-line mb-8 cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Canvas for particles and light rays */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Interactive Soft Glow (Presence Simulation) */}
      <motion.div 
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-0 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(232, 180, 140, 0.15) 0%, rgba(248, 246, 243, 0) 70%)',
          x: mousePos.x - 200,
          y: mousePos.y - 200,
          opacity: isHovering ? 1 : 0
        }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-8 text-muted font-sans text-xs uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
              Mode: {currentMode}
            </div>
            <div className="w-px h-4 bg-line"></div>
            <div>Time: {currentTime}</div>
            <div className="w-px h-4 bg-line"></div>
            <div>Temp: {isHovering ? '22°C' : '18°C'}</div>
          </div>

          <h1 className="text-5xl md:text-6xl font-sans font-light text-ink tracking-tight">
            Serene Intelligence
          </h1>
          
          <p className="text-lg md:text-xl font-serif text-muted max-w-2xl italic">
            "Anticipating threats before they emerge, wrapped in a calm, focused environment. 
            Your space, secured and serene."
          </p>
        </motion.div>
      </div>

      {/* Flowing light lines (SVG) */}
      <svg className="absolute bottom-0 left-0 w-full h-24 z-0 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path 
          d="M0,50 Q25,30 50,50 T100,50" 
          fill="none" 
          stroke="var(--theme-orange)" 
          strokeOpacity={0.3}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.path 
          d="M0,60 Q25,80 50,60 T100,60" 
          fill="none" 
          stroke="var(--theme-orange)" 
          strokeOpacity={0.2}
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
};
