import React, { useEffect, useRef, useCallback } from 'react';

// --- Configuration Constants ---
const PARTICLE_DENSITY = 0.00015;
const BG_PARTICLE_DENSITY = 0.00008;
const MOUSE_RADIUS = 180;
const RETURN_SPEED = 0.08;
const DAMPING = 0.90;
const REPULSION_STRENGTH = 1.2;

const randomRange = (min, max) => Math.random() * (max - min) + min;

export const ParticleCanvas = ({ accentColor = '#4285F4' }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef(0);

  // Initialize Particles
  const initParticles = useCallback((width, height) => {
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      newParticles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: randomRange(1.5, 3), 
        color: Math.random() > 0.85 ? accentColor : '#ffffff', 
        angle: Math.random() * Math.PI * 2,
        speed: randomRange(0.2, 0.8),
      });
    }
    particlesRef.current = newParticles;

    // Background particles - more of them for a starfield effect
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    const newBgParticles = [];
    
    for (let i = 0; i < bgCount; i++) {
      newBgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: randomRange(0.5, 2),
        alpha: randomRange(0.2, 0.8),
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: randomRange(0.002, 0.008),
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: randomRange(0.1, 0.4),
      });
    }
    backgroundParticlesRef.current = newBgParticles;
  }, [accentColor]);

  // Animation Loop
  const animate = useCallback((time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dynamic Pulsating Radial Glow
    const centerX = width / 2;
    const centerY = height / 2;
    const pulseOpacity = Math.sin(time * 0.001) * 0.04 + 0.08; 
    
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, Math.max(width, height) * 0.8
    );
    gradient.addColorStop(0, `rgba(66, 133, 244, ${pulseOpacity})`);
    gradient.addColorStop(0.5, `rgba(66, 133, 244, ${pulseOpacity * 0.3})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Background Particles (Animated Stars)
    const bgParticles = backgroundParticlesRef.current;
    
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      
      // Drift movement
      p.driftAngle += 0.001;
      p.x += Math.cos(p.driftAngle) * p.driftSpeed;
      p.y += Math.sin(p.driftAngle) * p.driftSpeed;
      
      // Add slight random movement
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around screen
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      // Dynamic twinkle effect
      const twinkle = Math.sin(time * p.twinkleSpeed + p.phase);
      const currentAlpha = p.alpha * (0.3 + 0.7 * ((twinkle + 1) / 2));
      
      // Size pulse
      const sizePulse = 1 + Math.sin(time * 0.003 + p.phase) * 0.3;

      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = Math.random() > 0.98 ? '#4285F4' : '#ffffff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * sizePulse, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // Main Foreground Particles
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS; 
        
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * 5; 
        p.vy -= forceDirectionY * repulsion * 5;
      }

      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;
      
      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;
      
      // Add organic oscillation
      p.angle += 0.02;
      p.vx += Math.sin(p.angle) * 0.05;
      p.vy += Math.cos(p.angle) * 0.05;
    }

    // Collision Detection (simplified for performance)
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = (p1.size + p2.size) * 1.5;

        if (distSq < minDist * minDist && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;

          const overlap = minDist - dist;
          p1.x -= nx * overlap * 0.3;
          p1.y -= ny * overlap * 0.3;
          p2.x += nx * overlap * 0.3;
          p2.y += ny * overlap * 0.3;

          const dvx = p1.vx - p2.vx;
          const dvy = p1.vy - p2.vy;
          const velocityAlongNormal = dvx * nx + dvy * ny;

          if (velocityAlongNormal > 0) {
            const restitution = 0.7;
            const impulse = velocityAlongNormal * restitution;
            p1.vx -= impulse * nx * 0.5;
            p1.vy -= impulse * ny * 0.5;
            p2.vx += impulse * nx * 0.5;
            p2.vy += impulse * ny * 0.5;
          }
        }
      }
    }

    // Integration & Drawing
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.vx *= DAMPING;
      p.vy *= DAMPING;

      p.x += p.vx;
      p.y += p.vy;

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.4 + velocity * 0.15, 1); 
      const glowSize = p.size * (1 + velocity * 0.2);

      // Glow effect
      if (velocity > 0.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color === '#ffffff' 
          ? `rgba(255, 255, 255, ${opacity * 0.1})` 
          : `rgba(66, 133, 244, ${opacity * 0.2})`;
        ctx.fill();
      }

      // Main particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#ffffff' 
        ? `rgba(255, 255, 255, ${opacity})` 
        : p.color;
      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const ctx = canvasRef.current.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        initParticles(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Mouse Handlers
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden bg-black cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default ParticleCanvas;
