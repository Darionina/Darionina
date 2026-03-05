/* VARIABLES GLOBALES */
const flowerColors = [
  { ext: '#ff3d81', int: '#ff6fae' }, 
  { ext: '#ffb703', int: '#ffea00' }, 
  { ext: '#fb8500', int: '#ffb703' }, 
  { ext: '#e0aaff', int: '#c77dff' }  
];
let isFullScreen = false;
let hasStarted = false; // NUEVA VARIABLE: Nos ayuda a saber si ya presionó el botón

/* 1. TEXTO LETRA POR LETRA (Arranca automáticamente) */
const message = 'Hola Jennifer ✨';
const textEl = document.getElementById('text');
[...message].forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char === ' ' ? '\u00A0' : char;
  span.style.animationDelay = `${i * 0.12}s`;
  textEl.appendChild(span);
});

/* 2. GENERADOR DE FLORES (Arranca automáticamente) */
function spawnFlower() {
  const f = document.createElement('div');
  f.className = 'flower';
  
  const size = 20 + Math.random() * 25; 
  f.style.width = size + 'px';
  f.style.height = size + 'px';
  
  if (isFullScreen) {
    // Carta activa: salen por todo el ancho
    f.style.left = Math.random() * 96 + 2 + '%'; 
  } else {
    // Intro activa: salen solo por los costados
    f.style.left = Math.random() < 0.5 ? (Math.random() * 20 + '%') : (80 + Math.random() * 20 + '%');
  }

  f.style.animationDuration = 8 + Math.random() * 6 + 's'; 
  const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];

  f.innerHTML = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible;">
      <line x1="50" y1="70" x2="50" y2="105" stroke="#2d6a4f" stroke-width="5" stroke-linecap="round"/>
      <path d="M50,95 Q75,75 65,45 Q55,75 50,85" fill="#40916c"/>
      <path d="M50,90 Q25,70 35,45 Q45,70 50,80" fill="#52b788"/>
      <path d="M50,75 C20,75 10,25 30,15 C45,35 50,55 50,75" fill="${color.ext}"/>
      <path d="M50,75 C80,75 90,25 70,15 C55,35 50,55 50,75" fill="${color.ext}"/>
      <path d="M25,25 C40,5 60,5 75,25 C60,40 50,60 50,75 C50,60 40,40 25,25" fill="${color.int}"/>
    </svg>
  `;

  document.body.appendChild(f);
  setTimeout(() => f.remove(), 15000);
}

// Iniciar las flores al cargar
setInterval(spawnFlower, 300);

/* 3. EVENTO DEL BOTÓN (Música baja y cambio de pantalla) */
document.getElementById('start-btn').addEventListener('click', () => {
  hasStarted = true; // Confirmamos que la experiencia ya empezó

  // Reproducir la música a volumen MUY bajo (15%)
  const bgMusic = document.getElementById('bg-music');
  bgMusic.volume = 0.07; 
  bgMusic.play();

  // Ocultar la pantalla inicial
  document.getElementById('intro-screen').classList.remove('active');

  // Esperar 2 segundos de transición para mostrar la carta
  setTimeout(() => {
    document.getElementById('letter-screen').classList.add('active');
    isFullScreen = true; // Las flores empiezan a esparcirse
  }, 2000);
});

/* 4. CONTROL DE PESTAÑA (Pausar y reanudar música) */
document.addEventListener("visibilitychange", () => {
  const bgMusic = document.getElementById('bg-music');
  
  // Solo aplicamos esto si ella ya le dio clic al botón inicial
  if (hasStarted) {
    if (document.hidden) {
      bgMusic.pause(); // Se pausa si cambia de pestaña o minimiza
    } else {
      bgMusic.play();  // Vuelve a sonar cuando regresa a la carta
    }
  }
});