import { useEffect } from "react";

const CanvasCursor = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none"; // Prevent interaction
    canvas.style.zIndex = "9999"; // Ensure it's on top
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let particles = [];

    // Resize canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse movement handler
    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;
      
      // Add new particle on mouse move
      particles.push({ x, y, radius: 10, opacity: 1 });

      // Limit number of particles for smooth effect
      if (particles.length > 50) particles.shift();
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animateCursor = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        p.opacity -= 0.02; // Fade effect
        p.radius *= 0.90; // Shrinking effect

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 255, ${p.opacity})`;
        ctx.shadowColor = "red"; // Glow effect
        ctx.shadowBlur = 5;
        ctx.fill();

        if (p.opacity <= 0) particles.splice(index, 1); // Remove faded particles
      });

      requestAnimationFrame(animateCursor);
    };

    animateCursor(); // Start animation loop

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      document.body.removeChild(canvas);
    };
  }, []);

  return null; // No visible UI, only effects
};

export default CanvasCursor;
