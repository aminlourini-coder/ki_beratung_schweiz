// Enhanced Assessment Form Handler
const form = document.getElementById('assessment-form');
const modal = document.getElementById('assessment-modal');
const closeBtn = document.getElementById('assessment-close');
const steps = document.querySelectorAll('.step');
let currentStep = 1;

// Initialize
document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', handleStepNavigation);
});

form.addEventListener('submit', handleSubmit);
closeBtn.addEventListener('click', closeModal);

// Industry-based scoring
const industryScores = {
  'Buchhaltung': 95, 'Immobilien': 85, 'Handwerk': 80, 'Versicherung': 90,
  'Finanzen': 98, 'Industrie': 88, 'Handel': 92, 'Gesundheit': 87,
  'Energie': 84, 'Sonstiges': 70
};

const sizeBoosts = { 'micro': 20, 'small': 15, 'medium': 10, 'large': 5 };

const savingsByIndustry = {
  'Buchhaltung': 45000, 'Immobilien': 38000, 'Handwerk': 32000, 'Versicherung': 52000,
  'Finanzen': 58000, 'Industrie': 48000, 'Handel': 42000, 'Gesundheit': 36000,
  'Energie': 40000, 'Sonstiges': 25000
};

const recommendations = {
  'Belegverarbeitung': 'Intelligent Document Processing - Spart 85% Zeit',
  'Kundenanfragen': 'KI-Chatbot 24/7 Support - Senkt Kosten um 70%',
  'Datenanalyse': 'Predictive Analytics - Erhöht Umsatz um 15-25%',
  'Angebotserstellung': 'AI-Angebotsgenerator - 10x schneller',
  'Prozess-Dokumentation': 'Auto-Dokumentation - Eliminiert manuelle Arbeit',
  'Datenstrategie': 'Datengovernance - Neue Einnahmequellen'
};

function handleStepNavigation(e) {
  const action = e.target.dataset.action;
  const step = parseInt(e.target.closest('.step').dataset.step);
  if (action === 'next' && validateStep(step)) goToStep(step + 1);
  else if (action === 'back') goToStep(step - 1);
}

function validateStep(step) {
  const stepEl = document.querySelector(`[data-step="${step}"]`);
  const inputs = stepEl.querySelectorAll('input[required]');
  let valid = true;
  inputs.forEach(input => {
    if (input.type === 'radio') {
      const group = form.querySelectorAll(`[name="${input.name}"]`);
      if (!Array.from(group).some(i => i.checked)) { valid = false; }
    } else if (!input.value) { valid = false; }
  });
  return valid;
}

function goToStep(step) {
  if (step < 1 || step > 4) return;
  currentStep = step;
  steps.forEach(s => s.hidden = true);
  document.querySelector(`[data-step="${step}"]`).hidden = false;
  document.getElementById('progress-bar').style.width = ((step - 1) / 3 * 100) + '%';
}

function handleSubmit(e) {
  e.preventDefault();
  if (!validateStep(3)) return;
  
  const branche = form.querySelector('input[name="branche"]:checked').value;
  const size = form.querySelector('input[name="company_size"]:checked').value;
  const pains = Array.from(form.querySelectorAll('input[name="pain"]:checked')).map(i => i.value);
  const name = form.querySelector('input[name="name"]').value;
  const email = form.querySelector('input[name="email"]').value;

  const baseScore = industryScores[branche] || 70;
  const totalScore = Math.min(baseScore + (sizeBoosts[size] || 0) + Math.min(pains.length * 8, 24), 100);
  const baseSavings = savingsByIndustry[branche] || 25000;
  const sizeMultiplier = {micro: 0.3, small: 0.6, medium: 1, large: 1.5}[size] || 1;
  const totalSavings = Math.round(baseSavings * sizeMultiplier);
  
  displayResults(totalScore, branche, totalSavings, pains.map(p => recommendations[p]).slice(0, 3), {name, email});
}

function displayResults(score, branche, savings, recList, contact) {
  let [level, color] = score >= 85 ? ['Sehr Hoch - KRITISCH! ', '#00FF88'] :
                       score >= 70 ? ['Hoch - Grosses Potenzial! ', '#00FFFF'] :
                       score >= 55 ? ['Moderat ', '#8B5CF6'] : ['Niedrig ', '#FFD700'];
  
  document.getElementById('result-score').textContent = score;
  document.getElementById('result-score').style.color = color;
  document.getElementById('result-summary').innerHTML = `<strong style="color: ${color};">${branche} - ${level}</strong><p style="margin-top: 1rem;">Enormes Potenzial zur Automatisierung und Effizienzsteigerung. KI-Einsatz ist notwendig.</p>`;
  document.getElementById('result-savings').textContent = 'CHF ' + savings.toLocaleString('de-CH');
  
  const recEl = document.getElementById('result-recommendations');
  recEl.innerHTML = '';
  recList.forEach(r => { const li = document.createElement('li'); li.textContent = r; li.style.marginBottom = '0.75rem'; recEl.appendChild(li); });
  
  window.assessmentData = { score, branche, savings, contact };
  goToStep(4);
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  form.reset();
  goToStep(1);
}

document.getElementById('book-meet').addEventListener('click', () => {
  const {contact} = window.assessmentData;
  window.location.href = `pages/kontakt.html?name=${encodeURIComponent(contact.name)}&email=${encodeURIComponent(contact.email)}`;
});

document.getElementById('close-result').addEventListener('click', closeModal);
document.querySelectorAll('#cta-primary, #open-assessment').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
  });
});

modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
