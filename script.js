const button = document.querySelector('.btn');
button.addEventListener('click', () => {
  button.classList.remove('animate');
  void button.offsetWidth; 
  button.classList.add('animate');
});

const checkbox = document.querySelector('.remember-forgot input[type="checkbox"]');
const container = document.querySelector('.remember-forgot');
let particleThrottle = null;

checkbox.addEventListener('change', () => {
  if (checkbox.checked && !particleThrottle) {
    createParticles();
    particleThrottle = setTimeout(() => {
      particleThrottle = null;
    }, 600); 
  }
});

function createParticles() {
  const rect = checkbox.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    container.appendChild(particle);

    const dx = (Math.random() - 0.45) * 100 + 'px';
    const dy = (Math.random() - 0.5) * 100 + 'px';
    particle.style.setProperty('--dx', dx);
    particle.style.setProperty('--dy', dy);

    const particleLeft = (rect.left - containerRect.left) + (rect.width / 2);
    const particleTop = (rect.top - containerRect.top) + (rect.height / 2);
    particle.style.left = particleLeft + 'px';
    particle.style.top = particleTop + 'px';

    particle.style.animation = 'pop 600ms ease-out forwards';

    setTimeout(() => particle.remove(), 600);
  }
}

document.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.addEventListener('mousedown', () => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
  const cursor = document.querySelector('.custom-cursor');
  cursor.classList.remove('active');
});

const hoverables = document.querySelectorAll('a, button, input, [role="button"]');
const cursor = document.querySelector('.custom-cursor');
hoverables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
  });
});

const canvas = document.getElementById('dot-grid');
const ctx = canvas.getContext('2d');
let mouseX = 0;
let mouseY = 0;
const gridSpacing = 30;
const dotRadius = 1.5;
const maxDistance = 100; // Distance within which dots react to mouse
const maxDisplacement = 10; // Maximum distance a dot can move

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

class Dot {
  constructor(x, y) {
    this.baseX = x;
    this.baseY = y;
    this.x = x;
    this.y = y;
  }

  update() {
    const dx = mouseX - this.baseX;
    const dy = mouseY - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < maxDistance) {
      const force = (1 - distance / maxDistance) * maxDisplacement;
      const angle = Math.atan2(dy, dx);
      this.x = this.baseX - Math.cos(angle) * force;
      this.y = this.baseY - Math.sin(angle) * force;
    } else {
      this.x = this.baseX;
      this.y = this.baseY;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
  }
}

// Create grid of dots
const dots = [];
for (let x = 0; x < window.innerWidth; x += gridSpacing) {
  for (let y = 0; y < window.innerHeight; y += gridSpacing) {
    dots.push(new Dot(x, y));
  }
}

// Animation loop (kind of laggy now)
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    dot.update();
    dot.draw();
  });
  requestAnimationFrame(animate);
}
animate();

