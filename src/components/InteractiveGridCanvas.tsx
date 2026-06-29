import React, { useEffect, useRef, useState } from "react";

interface InteractiveGridProps {
  brand: "liftedveil" | "fluencytech";
}

export const InteractiveGridCanvas: React.FC<InteractiveGridProps> = ({ brand }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  // Use ResizeObserver for precise container sizing as instructed in our guidelines
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Update canvas sizing and scale for High-DPI displays
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);
  }, [dimensions]);

  // Tracking cursor movement with easing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Primary animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Grid config
    const gridSize = brand === "liftedveil" ? 75 : 60;
    
    // Custom particle dust system
    const particleCount = brand === "liftedveil" ? 35 : 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * (brand === "liftedveil" ? 0.25 : 0.4),
        vy: (Math.random() - 0.5) * (brand === "liftedveil" ? 0.25 : 0.4),
        size: Math.random() * (brand === "liftedveil" ? 1.5 : 2) + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      time += 0.005;

      // Smooth cursor coordinate interpolation (easing)
      const mouse = mouseRef.current;
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.15;
          mouse.y += (mouse.targetY - mouse.y) * 0.15;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Draw Grid System
      const cols = Math.ceil(dimensions.width / gridSize) + 1;
      const rows = Math.ceil(dimensions.height / gridSize) + 1;

      ctx.lineWidth = 0.5;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const originX = c * gridSize;
          const originY = r * gridSize;

          // Introduce slow floating animation to grid lines
          const offsetX = Math.sin(time + c * 0.5) * 2;
          const offsetY = Math.cos(time + r * 0.5) * 2;

          let targetX = originX + offsetX;
          let targetY = originY + offsetY;

          // Reactive mouse force distortion
          if (mouse.x !== -1000) {
            const dx = mouse.x - targetX;
            const dy = mouse.y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = brand === "liftedveil" ? 120 : 160;

            if (dist < influence) {
              const force = (influence - dist) / influence;
              // Push or pull nodes based on brand identity
              const pullFactor = brand === "liftedveil" ? -15 : 22; // Liftedveil pushes away slightly (luxury space), Tech pulls nodes in (magnetic core)
              targetX += (dx / dist) * force * pullFactor;
              targetY += (dy / dist) * force * pullFactor;
            }
          }

          // Draw vertical / horizontal lines
          ctx.beginPath();
          if (brand === "liftedveil") {
            ctx.strokeStyle = "rgba(201, 168, 76, 0.04)"; // Luxury gold grid
          } else {
            ctx.strokeStyle = "rgba(0, 229, 204, 0.05)"; // Electric teal grid
          }
          
          // Connect to neighbor nodes (right & down)
          if (c < cols - 1) {
            let nextX = (c + 1) * gridSize + Math.sin(time + (c + 1) * 0.5) * 2;
            let nextY = r * gridSize + Math.cos(time + r * 0.5) * 2;

            if (mouse.x !== -1000) {
              const ndx = mouse.x - nextX;
              const ndy = mouse.y - nextY;
              const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
              const influence = brand === "liftedveil" ? 120 : 160;
              if (ndist < influence) {
                const nforce = (influence - ndist) / influence;
                const pullFactor = brand === "liftedveil" ? -15 : 22;
                nextX += (ndx / ndist) * nforce * pullFactor;
                nextY += (ndy / ndist) * nforce * pullFactor;
              }
            }
            ctx.moveTo(targetX, targetY);
            ctx.lineTo(nextX, nextY);
          }

          if (r < rows - 1) {
            let nextX = c * gridSize + Math.sin(time + c * 0.5) * 2;
            let nextY = (r + 1) * gridSize + Math.cos(time + (r + 1) * 0.5) * 2;

            if (mouse.x !== -1000) {
              const ndx = mouse.x - nextX;
              const ndy = mouse.y - nextY;
              const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
              const influence = brand === "liftedveil" ? 120 : 160;
              if (ndist < influence) {
                const nforce = (influence - ndist) / influence;
                const pullFactor = brand === "liftedveil" ? -15 : 22;
                nextX += (ndx / ndist) * nforce * pullFactor;
                nextY += (ndy / ndist) * nforce * pullFactor;
              }
            }
            ctx.moveTo(targetX, targetY);
            ctx.lineTo(nextX, nextY);
          }
          ctx.stroke();

          // Brand-specific grid intersection details
          if (brand === "fluencytech" && c % 2 === 0 && r % 2 === 0) {
            // Draw small cyber nodes at grid intersections
            ctx.beginPath();
            ctx.arc(targetX, targetY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(0, 229, 204, 0.15)";
            ctx.fill();
          } else if (brand === "liftedveil" && c % 3 === 0 && r % 3 === 0) {
            // Luxury tiny star/cross details on intersection
            ctx.beginPath();
            ctx.strokeStyle = "rgba(201, 168, 76, 0.15)";
            ctx.moveTo(targetX - 3, targetY);
            ctx.lineTo(targetX + 3, targetY);
            ctx.moveTo(targetX, targetY - 3);
            ctx.lineTo(targetX, targetY + 3);
            ctx.stroke();
          }
        }
      }

      // Draw Floating Dust/Cyber Particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around margins
        if (p.x < 0) p.x = dimensions.width;
        if (p.x > dimensions.width) p.x = 0;
        if (p.y < 0) p.y = dimensions.height;
        if (p.y > dimensions.height) p.y = 0;

        // Mouse reactive force on floating particles
        let renderX = p.x;
        let renderY = p.y;
        if (mouse.x !== -1000) {
          const pdx = mouse.x - p.x;
          const pdy = mouse.y - p.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          if (pdist < 150) {
            const pforce = (150 - pdist) / 150;
            // Liftedveil floats away softly, FluencyTech sucks them in slightly like gravity
            const factor = brand === "liftedveil" ? -25 : 30;
            renderX += (pdx / pdist) * pforce * factor;
            renderY += (pdy / pdist) * pforce * factor;

            // Render interactive connecting lines in tech mode
            if (brand === "fluencytech" && pdist < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 229, 204, ${(100 - pdist) / 100 * 0.12})`;
              ctx.moveTo(renderX, renderY);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        if (brand === "liftedveil") {
          ctx.fillStyle = `rgba(201, 168, 76, ${p.alpha})`; // Muted luxury Gold dust
        } else {
          ctx.fillStyle = `rgba(0, 229, 204, ${p.alpha})`; // Holographic tech particles
        }
        ctx.fill();
      });

      // Mouse interactive focal glow
      if (mouse.x !== -1000) {
        ctx.beginPath();
        const rad = brand === "liftedveil" ? 120 : 150;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, rad);
        if (brand === "liftedveil") {
          grad.addColorStop(0, "rgba(201, 168, 76, 0.06)");
          grad.addColorStop(1, "rgba(201, 168, 76, 0)");
        } else {
          grad.addColorStop(0, "rgba(0, 229, 204, 0.08)");
          grad.addColorStop(0.5, "rgba(0, 168, 232, 0.02)");
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        }
        ctx.arc(mouse.x, mouse.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, brand]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      <canvas 
        id={`interactive-grid-canvas-${brand}`}
        ref={canvasRef} 
        className="block w-full h-full opacity-65"
      />
    </div>
  );
};
