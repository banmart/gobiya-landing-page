import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Geometry, Program, Mesh } from 'ogl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlobalWebGLBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = containerRef.current;
    if (!container) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ alpha: true, depth: false, antialias: true });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back to empty background:', e);
      return;
    }

    const gl = renderer.gl;
    gl.canvas.style.position = 'fixed';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100vw';
    gl.canvas.style.height = '100vh';
    gl.canvas.style.pointerEvents = 'none';
    gl.canvas.style.zIndex = '-20';
    gl.canvas.style.opacity = '0.07'; // subtle light opacity
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 1.2, 2.5);
    camera.lookAt([0, 0, 0]);

    const scene = new Transform();

    // Resize handler
    function resize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.perspective({ aspect: width / height });
    }
    window.addEventListener('resize', resize);
    resize();

    // Create particle grid geometry representing marketing networks and connections
    const countX = 35;
    const countY = 35;
    const numParticles = countX * countY;
    const positions = new Float32Array(numParticles * 3);
    const stepX = 0.16;
    const stepY = 0.16;
    const offsetX = (countX - 1) * stepX * 0.5;
    const offsetY = (countY - 1) * stepY * 0.5;

    let index = 0;
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        positions[index * 3] = x * stepX - offsetX;
        positions[index * 3 + 1] = 0; // Y coordinate
        positions[index * 3 + 2] = y * stepY - offsetY;
        index++;
      }
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions }
    });

    const vertex = `
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uScroll;
      
      varying vec3 vPosition;

      void main() {
        vPosition = position;
        vec3 pos = position;
        
        // Floating marketing waves / conversion funnel flow animations
        float wave1 = sin(pos.x * 1.4 + uTime * 0.7) * 0.12;
        float wave2 = cos(pos.z * 1.4 + uTime * 0.5) * 0.12;
        float waveScroll = sin(pos.x * 2.5 + uScroll * 0.004) * 0.08;
        
        pos.y += wave1 + wave2 + waveScroll;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 3.0;
      }
    `;

    const fragment = `
      precision highp float;
      
      void main() {
        vec2 pc = gl_PointCoord - vec2(0.5);
        if (dot(pc, pc) > 0.25) discard;
        
        // Subtle Gobiya primary orange/green tone with light opacity
        gl_FragColor = vec4(0.24, 0.47, 0.38, 0.6); 
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 }
      },
      transparent: true,
      depthTest: false
    });

    const mesh = new Mesh(gl, { geometry, program, mode: gl.POINTS });
    mesh.setParent(scene);
    
    // Tilt slightly initially
    mesh.rotation.x = -0.3;

    // Animate mesh rotation dynamically on scroll using GSAP ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        program.uniforms.uScroll.value = self.scroll();
        
        // Rotate grid slightly based on scroll position to feel alive
        gsap.to(mesh.rotation, {
          y: self.progress * 0.35,
          x: -0.3 - self.progress * 0.08,
          duration: 0.6,
          overwrite: 'auto'
        });
      }
    });

    // Animation Loop
    let animationId: number;
    let time = 0;
    function update() {
      animationId = requestAnimationFrame(update);
      time += 0.012;
      program.uniforms.uTime.value = time;
      renderer.render({ scene, camera });
    }
    update();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      scrollTrigger.kill();
      try {
        if (gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
      } catch (err) {
        console.warn('Error cleaning up canvas:', err);
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: -20 }} />;
};

export default GlobalWebGLBackground;
