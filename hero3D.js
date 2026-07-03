// hero3D.js
// Handles the Ultra-Premium Cinematic 3D Floating Memory Ribbon and Particles

document.addEventListener('DOMContentLoaded', () => {
  // Give a small delay to ensure mediaFiles are initialized
  setTimeout(() => {
    initHero3DRibbon();
    initHeroParticles();
  }, 100);
});

let ribbonAnimationFrame;
let ribbonPaused = false;

function initHero3DRibbon() {
  const container = document.getElementById('heroRibbonContainer');
  if (!container || !window.GLOBAL_MEDIA_FILES) return;

  // Grab the first 20 images
  const maxItems = window.innerWidth < 768 ? 12 : 20; // Mobile optimization
  const items = window.GLOBAL_MEDIA_FILES.filter(item => item.type === 'image').slice(0, maxItems);

  const numItems = items.length;
  const ribbonNodes = [];

  // Create DOM nodes
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'ribbon-item';

    // Store data for lazy loading
    el.dataset.src = item.src;
    el.dataset.type = item.type;
    el.dataset.index = i;

    // Hover Interaction: Pause and Highlight
    el.addEventListener('mouseenter', () => {
      ribbonPaused = true;
      el.classList.add('hovered');

      // Blur and fade all other items
      ribbonNodes.forEach(node => {
        if (node.el !== el) {
          node.el.style.opacity = '0.2';
          node.el.style.filter = 'blur(10px)';
        }
      });
    });

    el.addEventListener('mouseleave', () => {
      ribbonPaused = false;
      el.classList.remove('hovered');

      // Restore dynamic opacity/blur based on depth
      ribbonNodes.forEach(node => {
        if (node.el !== el) {
          node.el.style.opacity = node.baseOpacity;
          node.el.style.filter = `blur(${node.baseBlur}px)`;
        }
      });
    });

    container.appendChild(el);
    ribbonNodes.push({
      el,
      loaded: false,
      baseOpacity: 1,
      baseBlur: 0
    });
  });

  // Animation Loop Variables
  let time = 0;
  const duration = 50// Seconds for full cycle (increased from 30 to slow it down)
  const speed = 1 / (duration * 60); // approx distance per frame

  function renderRibbon() {
    if (!ribbonPaused) {
      time += speed;
    }

    ribbonNodes.forEach((node, i) => {
      // t represents the normalized position along the loop (0.0 to 1.0)
      let t = (i / numItems) + time;
      t = t % 1.0;

      // Parametric equations for a sweeping, looping 3D path
      // x: Sweeps left to right and back
      // z: Brings the item forward in the center, pushes it back on the edges
      // y: Natural floating bob
      const x = Math.sin(t * Math.PI * 2) * (window.innerWidth * 0.7);
      const z = Math.cos(t * Math.PI * 2) * 800 - 200;
      const y = Math.sin(t * Math.PI * 4) * 150 + Math.sin(t * Math.PI * 8) * 50;

      // Smooth rotations so images dynamically bank and face the flow
      const rotY = Math.sin(t * Math.PI * 2) * 35; // Turns as it sweeps
      const rotX = Math.cos(t * Math.PI * 4) * 10;
      const rotZ = Math.sin(t * Math.PI * 2) * 5;

      // Cinematic Depth Effects
      // When z is positive (closer), it's sharper and brighter
      // When z is negative (further), it fades and blurs
      const zIndex = Math.round(z + 2000);
      let opacity = 1;
      let blur = 0;

      if (z < 0) {
        // Fade off into the distance
        opacity = Math.max(0.1, 1 - (Math.abs(z) / 800));
        blur = Math.min(15, Math.abs(z) / 40);
      } else {
        // Very sharp in the front
        opacity = Math.min(1, 0.5 + (z / 600));
        blur = 0;
      }

      node.baseOpacity = opacity;
      node.baseBlur = blur;

      if (!node.el.classList.contains('hovered')) {
        node.el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`;
        node.el.style.zIndex = zIndex;
        node.el.style.opacity = opacity;
        node.el.style.filter = `blur(${blur}px)`;
      }

      // Lazy Load Image as it approaches visibility
      if (z > -600 && !node.loaded) {
        node.loaded = true;
        const img = document.createElement('img');
        img.src = node.el.dataset.src;
        // Apply a smooth fade-in for newly loaded images
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; };
        node.el.appendChild(img);
      }
    });

    ribbonAnimationFrame = requestAnimationFrame(renderRibbon);
  }

  // Start the ribbon!
  renderRibbon();

  // Scroll Trigger to Pause when Hero is out of view (Performance)
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top bottom',
      end: 'bottom top',
      onLeave: () => {
        if (ribbonAnimationFrame) {
          cancelAnimationFrame(ribbonAnimationFrame);
          ribbonAnimationFrame = null;
        }
      },
      onEnterBack: () => {
        if (!ribbonAnimationFrame) {
          renderRibbon();
        }
      }
    });
  }
}

// Ultra-Premium Golden Particle System
function initHeroParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const numParticles = window.innerWidth < 768 ? 60 : 180; // Optimize for mobile

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.6,
      speedY: (Math.random() - 0.5) * 0.6 - 0.3, // Gentle upward drift
      life: Math.random() * Math.PI * 2, // Random starting phase for twinkle
      opacityBase: Math.random() * 0.6 + 0.2
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      // Seamless wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Magical Twinkle effect using Sine wave
      p.life += 0.02;
      const currentOpacity = p.opacityBase * (Math.sin(p.life) * 0.5 + 0.5);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
      ctx.fill();

      // Add subtle glow to larger particles
      if (p.size > 2) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      } else {
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();
}
