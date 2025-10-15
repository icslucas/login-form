const button = document.querySelector('.btn');
button.addEventListener('click', () => {
  button.classList.remove('animate');
  void button.offsetWidth; // restart animation
  button.classList.add('animate');
});

const checkbox = document.querySelector('.remember-forgot input[type="checkbox"]');
const container = document.querySelector('.remember-forgot');

checkbox.addEventListener('change', (e) => {
  if (checkbox.checked) {
    createParticles();
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
