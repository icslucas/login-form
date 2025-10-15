const button = document.querySelector('.btn');
button.addEventListener('click', () => {
  button.classList.remove('animate');
  void button.offsetWidth; // Restart animation
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
    }, 600); // Throttle to match particle duration
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