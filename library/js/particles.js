const colors = ['#e74c3c', '#2ecc71', '#3498db', '#f1c40f', '#9b59b6'];
const texts = ['富强', '民主', '文明', '和谐', '自由', '平等', '公正', '法治', '爱国', '敬业', '诚信', '友善'];

document.addEventListener('click', (e) => {
  const effect = document.createElement('span');
  effect.className = 'click-effect';
  effect.textContent = texts[Math.floor(Math.random() * texts.length)];
  effect.style.left = `${e.clientX}px`;
  effect.style.top = `${e.clientY}px`;
  effect.style.color = colors[Math.floor(Math.random() * colors.length)];
  
  document.body.appendChild(effect);
  
  effect.addEventListener('animationend', () => {
    effect.remove();
  });
});
