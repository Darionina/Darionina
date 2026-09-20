const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const screen3 = document.getElementById('screen-3');
const screen4 = document.getElementById('screen-4');

const btnHug = document.getElementById('btn-hug');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const decorativeBg = document.getElementById('decorative-bg');
const darkFlowersBg = document.getElementById('dark-flowers-bg');

// Referencia al audio
const bgMusic = document.getElementById('bg-music');

// === 1. LÓGICA DE FLORES DE FONDO ===
function getFlowerSVGs(isDarkTheme = false) {
    const purpleFlowerSVG = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" style="filter: drop-shadow(0 0 5px ${isDarkTheme ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'});">
        <circle cx="50" cy="30" r="20" fill="${isDarkTheme ? '#F48FB1' : '#E1BEE7'}" />
        <circle cx="70" cy="50" r="20" fill="${isDarkTheme ? '#F48FB1' : '#E1BEE7'}" />
        <circle cx="50" cy="70" r="20" fill="${isDarkTheme ? '#F48FB1' : '#E1BEE7'}" />
        <circle cx="30" cy="50" r="20" fill="${isDarkTheme ? '#F48FB1' : '#E1BEE7'}" />
        <circle cx="50" cy="50" r="15" fill="#FFD54F" />
    </svg>`;
    const miniSunflowerSVG = `
    <svg viewBox="0 0 100 100" width="100%" height="100%" style="filter: drop-shadow(0 0 8px ${isDarkTheme ? '#FFC107' : 'rgba(0,0,0,0.1)'});">
        <path d="M50,50 L35,10 L50,50 L65,10 Z" fill="#FFC107" />
        <path d="M50,50 L90,35 L50,50 L90,65 Z" fill="#FFC107" />
        <path d="M50,50 L65,90 L50,50 L35,90 Z" fill="#FFC107" />
        <path d="M50,50 L10,65 L50,50 L10,35 Z" fill="#FFC107" />
        <circle cx="50" cy="50" r="18" fill="#5D4037" />
    </svg>`;
    return [purpleFlowerSVG, miniSunflowerSVG];
}

function createDecorativeFlowers(container, numFlowers, isDarkTheme) {
    const flowers = getFlowerSVGs(isDarkTheme);
    for(let i = 0; i < numFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('dec-flower');
        const size = Math.random() * 30 + (isDarkTheme ? 20 : 30); 
        flower.style.width = `${size}px`;
        flower.style.height = `${size}px`;
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.top = `-${Math.random() * 100}vh`; 
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.animationDuration = `${Math.random() * 6 + 4}s`; 
        flower.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(flower);
    }
}
createDecorativeFlowers(decorativeBg, 25, false);

// === 2. GENERADOR DEL RAMO VIRAL Y ESTRELLAS ===
function getSunflowerSVG() {
    let petals = '';
    for(let i = 0; i < 360; i += 20) {
        petals += `<path d="M50,50 Q35,15 50,0 Q65,15 50,50" fill="#FFC107" stroke="#FF9800" stroke-width="0.5" transform="rotate(${i} 50 50)" />`;
        petals += `<path d="M50,50 Q42,25 50,5 Q58,25 50,50" fill="#FFEA00" stroke="#F57F17" stroke-width="0.5" transform="rotate(${i+10} 50 50)" />`;
    }
    return `
    <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible; filter: drop-shadow(0px 5px 5px rgba(0,0,0,0.5));">
        ${petals}
        <circle cx="50" cy="50" r="22" fill="#4E342E" />
        <circle cx="50" cy="50" r="18" fill="none" stroke="#3E2723" stroke-dasharray="2 3" stroke-width="4"/>
        <circle cx="50" cy="50" r="12" fill="none" stroke="#26140E" stroke-dasharray="1 2" stroke-width="3"/>
    </svg>`;
}

function createBouquetAndStars() {
    const starryBg = document.getElementById('starry-bg');
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        star.style.backgroundColor = Math.random() > 0.5 ? '#fff' : '#FFD54F';
        starryBg.appendChild(star);
    }

    const container = document.getElementById('bouquet-svg-container');
    container.innerHTML = `
        <svg viewBox="0 0 200 300" style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 220px; height: 280px; z-index: 5;">
            <polygon points="10,60 190,60 130,280 70,280" fill="rgba(199, 110, 143, 0.7)" />
            <polygon points="0,90 200,90 120,290 80,290" fill="rgba(224, 133, 169, 0.5)" stroke="rgba(255, 180, 210, 0.8)" stroke-width="2"/>
        </svg>
    `;

    const flowerPositions = [
        { x: 30, y: 10, scale: 0.7 },
        { x: 130, y: 0, scale: 0.75 },
        { x: 80, y: 40, scale: 0.9 },
        { x: 10, y: 70, scale: 0.8 },
        { x: 140, y: 80, scale: 0.75 },
        { x: 70, y: 110, scale: 1.0 } 
    ];

    flowerPositions.forEach((pos, index) => {
        const flower = document.createElement('div');
        flower.style.position = 'absolute';
        flower.style.left = `${pos.x}px`;
        flower.style.top = `${pos.y}px`;
        flower.style.width = '140px';
        flower.style.height = '140px';
        flower.style.transform = `scale(${pos.scale})`;
        flower.style.zIndex = Math.floor(pos.y); 
        
        if(index % 2 === 0) {
            const leaf = document.createElement('div');
            leaf.innerHTML = `<svg viewBox="0 0 50 50" width="60" height="60"><path d="M0,50 Q0,0 50,0 Q50,50 0,50" fill="#2E7D32" filter="drop-shadow(0px 3px 3px rgba(0,0,0,0.4))"/></svg>`;
            leaf.style.position = 'absolute';
            leaf.style.left = '-15px';
            leaf.style.top = '60px';
            leaf.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
            flower.appendChild(leaf);
        }
        flower.innerHTML += getSunflowerSVG();
        container.appendChild(flower);
    });

    createDecorativeFlowers(darkFlowersBg, 40, true);
}

// === 3. ANIMACIÓN DE LAS TARJETITAS ===
function playCardsAnimation() {
    const cards = document.querySelectorAll('.glass-card-mini');
    const questionTitle = document.getElementById('question-title');
    const actionButtons = document.getElementById('action-buttons');
    
    let currentCard = 0;

    function showNextCard() {
        if (currentCard < cards.length) {
            cards[currentCard].classList.add('show-card');
            
            setTimeout(() => {
                cards[currentCard].classList.remove('show-card');
                currentCard++;
                
                setTimeout(showNextCard, 1000);
            }, 6000);
        } else {
            questionTitle.style.opacity = 1;
            actionButtons.classList.remove('hidden');
            setTimeout(() => {
                actionButtons.style.opacity = 1;
            }, 100);
        }
    }

    setTimeout(showNextCard, 1500);
}

// === 4. EVENTOS Y TENDENCIA TIKTOK ===
btnHug.addEventListener('click', () => {
    switchScreen(screen1, screen2);
    createBouquetAndStars();
    playCardsAnimation(); 
});

const noPhrases = [
    "No",
    "¿Estás segura?",
    "Piénsalo bien...",
    "¡Me romperás el corazón! 💔",
    "Dale al Sí, porfa 🥺",
    "¡Te vas a arrepentir!",
    "Última oportunidad...",
    "¡Estás obligada a decir Sí! 🌻"
];
let noClickCount = 0;

btnNo.addEventListener('mouseover', moveButton);
btnNo.addEventListener('touchstart', moveButton);
btnNo.addEventListener('click', moveButton);

function moveButton(e) {
    e.preventDefault(); 
    
    btnNo.style.position = 'fixed';
    btnNo.style.zIndex = '999';
    const safeMargin = 20; 
    const maxX = window.innerWidth - btnNo.offsetWidth - safeMargin;
    const maxY = window.innerHeight - btnNo.offsetHeight - safeMargin;
    const randomX = Math.max(safeMargin, Math.random() * maxX);
    const randomY = Math.max(safeMargin, Math.random() * maxY);
    
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    noClickCount++;
    if(noClickCount < noPhrases.length) {
        btnNo.innerText = noPhrases[noClickCount];
    } else {
        btnNo.innerText = noPhrases[noPhrases.length - 1]; 
    }

    const scaleValue = 1 + (noClickCount * 0.4); 
    btnYes.style.transform = `scale(${scaleValue})`;
    btnYes.style.transition = `transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)`;
    btnYes.style.zIndex = '100'; 
}

btnYes.addEventListener('click', () => {
    // === AQUÍ SE CONTROLA LA MÚSICA Y EL VOLUMEN ===
    if(bgMusic) {
        bgMusic.volume = 0.2; // Volumen al 30% para que sea suave y de fondo
        bgMusic.play().catch(error => console.log("El navegador bloqueó el audio", error));
    }

    switchScreen(screen2, screen3);
    
    document.getElementById('starry-bg').style.display = 'none';
    document.getElementById('dark-flowers-bg').style.display = 'none';
    
    setTimeout(() => {
        switchScreen(screen3, screen4);
    }, 4500);
});

function switchScreen(hideScreen, showScreen) {
    hideScreen.classList.remove('active');
    setTimeout(() => {
        hideScreen.classList.add('hidden');
        showScreen.classList.remove('hidden');
        setTimeout(() => showScreen.classList.add('active'), 50);
    }, 500);
}