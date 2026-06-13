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
    gl.canvas.style.zIndex = '99';
    gl.canvas.style.mixBlendMode = 'difference';
    gl.canvas.style.opacity = '0.85'; // High visibility for inversion effect
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { fov: 45 });
    camera.position.set(0, 1.3, 2.6);
    camera.lookAt([0, 0, 0]);

    const scene = new Transform();

    // Rotate/Position Group to hold both Points and Lines
    const gridGroup = new Transform();
    gridGroup.setParent(scene);
    gridGroup.rotation.x = -0.3; // Default tilt

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
        positions[index * 3 + 1] = 0; // Flat initial base
        positions[index * 3 + 2] = y * stepY - offsetY;
        index++;
      }
    }

    // Generate indices to draw lines between adjacent grid nodes (plexus network)
    const indices = [];
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const i = x * countY + y;
        if (x < countX - 1) {
          indices.push(i, i + countY); // Line to right neighbor
        }
        if (y < countY - 1) {
          indices.push(i, i + 1); // Line to bottom neighbor
        }
      }
    }

    const geometry = new Geometry(gl, {
      position: { size: 3, data: positions },
      index: { size: 1, data: new Uint16Array(indices) }
    });

    // Share uniforms between points and lines for perfect sync
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: [0, 0] }
    };

    const vertexShader = `
      attribute vec3 position;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uScroll;
      uniform vec2 uMouse;
      
      varying vec3 vPosition;
      varying float vDistToMouse;

      void main() {
        vPosition = position;
        vec3 pos = position;
        
        // Premium interactive hover deformation: calculate distance to cursor in X-Z space
        vec2 mappedMouse = uMouse * vec2(2.8, 2.8);
        float mouseDist = distance(pos.xz, mappedMouse);
        float mouseForce = 1.0 - smoothstep(0.0, 1.8, mouseDist);
        vDistToMouse = mouseForce;
        
        // Sine wave calculations representing organic data flows
        float wave1 = sin(pos.x * 1.4 + uTime * 0.7) * 0.12;
        float wave2 = cos(pos.z * 1.4 + uTime * 0.5) * 0.12;
        float waveScroll = sin(pos.x * 2.5 + uScroll * 0.004) * 0.08;
        
        // Push Y height up near the cursor and apply wavy animation
        pos.y += wave1 + wave2 + waveScroll + mouseForce * 0.28;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = 3.5;
      }
    `;

    const pointsFragment = `
      precision highp float;
      varying float vDistToMouse;
      
      void main() {
        vec2 pc = gl_PointCoord - vec2(0.5);
        if (dot(pc, pc) > 0.25) discard;
        
        // White base color that inverts the light page background to dark charcoal/navy
        vec3 colorBase = vec3(0.95, 0.95, 0.95);
        // Orange highlight on hover (inverts to glowing cyan/sky-blue on light background)
        vec3 colorOrange = vec3(0.95, 0.40, 0.13);
        vec3 finalColor = mix(colorBase, colorOrange, vDistToMouse * 0.75);
        
        gl_FragColor = vec4(finalColor, 0.9); 
      }
    `;

    const linesFragment = `
      precision highp float;
      varying float vDistToMouse;
      
      void main() {
        // White/light-grey lines (invert to dark charcoal lines on light background)
        vec3 colorBase = vec3(0.9, 0.9, 0.9);
        vec3 colorOrange = vec3(0.95, 0.40, 0.13);
        vec3 finalColor = mix(colorBase, colorOrange, vDistToMouse * 0.6);
        
        gl_FragColor = vec4(finalColor, 0.28); 
      }
    `;

    // Points program
    const pointsProgram = new Program(gl, {
      vertex: vertexShader,
      fragment: pointsFragment,
      uniforms,
      transparent: true,
      depthTest: false
    });

    // Lines program
    const linesProgram = new Program(gl, {
      vertex: vertexShader,
      fragment: linesFragment,
      uniforms,
      transparent: true,
      depthTest: false
    });

    // Points Mesh (Vertices)
    const pointsMesh = new Mesh(gl, { geometry, program: pointsProgram, mode: gl.POINTS });
    pointsMesh.setParent(gridGroup);

    // Lines Mesh (Connective Net)
    const linesMesh = new Mesh(gl, { geometry, program: linesProgram, mode: gl.LINES });
    linesMesh.setParent(gridGroup);

    // Track smoothed mouse movement (easing coordinates)
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: -999, y: -999 }; // Hide hover initially offscreen
    let hasMovedMouse = false;

    function onMouseMove(e: MouseEvent) {
      hasMovedMouse = true;
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseLeave() {
      targetMouse.x = -999;
      targetMouse.y = -999;
    }

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Scroll animation with GSAP ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        uniforms.uScroll.value = self.scroll();
        
        // Tilt and rotate plexus slightly based on scroll position
        gsap.to(gridGroup.rotation, {
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
      
      // Update uTime uniform
      uniforms.uTime.value = time;
      
      // Smoothly interpolate mouse coordinates for organic ease
      if (hasMovedMouse && targetMouse.x !== -999) {
        mouse.x += (targetMouse.x - mouse.x) * 0.08;
        mouse.y += (targetMouse.y - mouse.y) * 0.08;
        uniforms.uMouse.value = [mouse.x, -mouse.y];
      } else {
        // Ease mouse off-screen if it leaves window
        mouse.x += (-999 - mouse.x) * 0.08;
        mouse.y += (-999 - mouse.y) * 0.08;
        uniforms.uMouse.value = [mouse.x, -mouse.y];
      }
      
      renderer.render({ scene, camera });
    }
    update();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
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

  return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99 }} />;
};

export default GlobalWebGLBackground;
