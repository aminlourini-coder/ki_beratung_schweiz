// Redirect GitHub Pages URL to custom domain
try {
  var h = window.location && window.location.hostname;
  if (h && (h.endsWith('.github.io') || h === 'github.io')) {
    var target = 'https://ki-netic.ch' + (window.location.pathname || '/') + (window.location.search || '') + (window.location.hash || '');
    window.location.replace(target);
  }
} catch (e) {}

// Hamburger Menu Toggle
function initMenuToggle() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (!menuToggle || !mainNav) return;
  
  // Handle menu with a single pointer handler to avoid double toggles on touch devices
  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
  };

  menuToggle.addEventListener('pointerdown', toggleMenu);
  
  // Close menu when clicking on a link
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      mainNav.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      // Navigation läuft normal weiter (kein preventDefault)
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('pointerdown', (e) => {
    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
      if (mainNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

// Modal Management
const assessmentModal = document.getElementById('assessment-modal');
const openAssessmentButtons = document.querySelectorAll('#open-assessment');
const assessmentCloseBtn = document.getElementById('assessment-close');

function openAssessment() {
  if (assessmentModal) {
    assessmentModal.setAttribute('aria-hidden', 'false');
    assessmentModal.style.display = 'flex';
  }
}

function closeAssessment() {
  if (assessmentModal) {
    assessmentModal.setAttribute('aria-hidden', 'true');
    assessmentModal.style.display = 'none';
  }
}

openAssessmentButtons.forEach(btn => {
  btn.addEventListener('click', openAssessment);
});

if (assessmentCloseBtn) {
  assessmentCloseBtn.addEventListener('click', closeAssessment);
}

// Close modal when clicking outside
if (assessmentModal) {
  assessmentModal.addEventListener('click', (e) => {
    if (e.target === assessmentModal) {
      closeAssessment();
    }
  });
}

// Countdown Timer
function updateCountdown() {
  const countdownEl = document.getElementById('countdown-timer');
  if (!countdownEl) return;
  
  const now = new Date();
  const nextMidnight = new Date();
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);
  
  const diff = nextMidnight - now;
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Neural Canvas Animation
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 18 : 30; // weniger Partikel auf Mobile für bessere Performance

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
    // Stelle sicher, dass Partikel im sichtbaren Bereich bleiben
    particles.forEach(p => {
      p.x = Math.min(window.innerWidth, Math.max(0, p.x));
      p.y = Math.min(window.innerHeight, Math.max(0, p.y));
    });
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.vx = (Math.random() - 0.5) * 1;
      this.vy = (Math.random() - 0.5) * 1;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
      if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      
      this.x = Math.max(0, Math.min(window.innerWidth, this.x));
      this.y = Math.max(0, Math.min(window.innerHeight, this.y));
    }
    
    draw() {
      ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.fillStyle = 'rgba(15, 15, 18, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Chatbot
function initChatbot() {
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send');
  
  if (!chatbotMessages || !chatbotInput || !chatbotSendBtn) return;
  
  const responses = [
    'Das klingt interessant! Können Sie mir mehr Details geben?',
    'Danke für die Frage. Das ist ein wichtiges Thema.',
    'Haben Sie bereits andere Lösungen ausprobiert?',
    'Gerne helfe ich Ihnen weiter mit KI-Lösungen!',
    'Was ist Ihr Hauptanliegen?'
  ];
  
  function addMessage(text, sender = 'user') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message message-${sender}`;
    msgDiv.textContent = text;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  chatbotSendBtn.addEventListener('click', () => {
    if (chatbotInput.value.trim()) {
      addMessage(chatbotInput.value, 'user');
      chatbotInput.value = '';
      
      setTimeout(() => {
        addMessage(responses[Math.floor(Math.random() * responses.length)], 'bot');
      }, 500);
    }
  });
  
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      chatbotSendBtn.click();
    }
  });
}

// AI Demo Streaming
function initAIDemo() {
  const aiDemoBtn = document.getElementById('ai-demo-btn');
  const aiDemoOutput = document.getElementById('ai-demo-output');
  
  if (!aiDemoBtn || !aiDemoOutput) return;
  
  aiDemoBtn.addEventListener('click', () => {
    const demoText = 'KI-Lösung analysiert die Belegverarbeitung und optimiert Prozesse... ✓ 99.2% Genauigkeit erreicht. ✓ Zeit pro Beleg: 2 Sekunden. ✓ Jährliche Einsparungen: CHF 45.000+';
    aiDemoOutput.textContent = '';
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < demoText.length) {
        aiDemoOutput.textContent += demoText[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
  initMenuToggle();
  initNeuralCanvas();
  initChatbot();
  initAIDemo();
});

// Handle window resize for canvas
window.addEventListener('resize', () => {
  initNeuralCanvas();
});
