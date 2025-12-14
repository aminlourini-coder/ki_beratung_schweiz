/**
 * KI.NETIC Assessment - Schweizer KMU Edition
 * Dynamische Berechnung basierend auf: MA-Anzahl × Stunden × Lohnkosten
 * Ziel: Realistische, glaubwürdige Zahlen für den CH-Markt
 */

document.addEventListener('DOMContentLoaded', () => {
  // === DOM ELEMENTS ===
  const form = document.getElementById('assessment-form');
  const modal = document.getElementById('assessment-modal');
  const closeBtn = document.getElementById('assessment-close');
  const steps = document.querySelectorAll('.step');
  const progressBar = document.getElementById('progress-bar');
  
  let currentStep = 1;

  // === KONFIGURATION: SCHWEIZER MARKT ===

  // Durchschnittliche Mitarbeiterzahl pro Kategorie (konservativ)
  const COMPANY_SIZE_AVG = {
    'micro': 1.5,    // 1-5 MA
    'small': 10,     // 6-20 MA
    'medium': 40,    // 21-100 MA
    'large': 140     // 100+ MA
  };

  // Kalkulatorischer Stundensatz (Lohn + Lohnnebenkosten 42% + Arbeitsplatz)
  const HOURLY_RATES_CHF = {
    'Buchhaltung': 100,
    'Immobilien': 95,
    'Handwerk': 70,
    'Versicherung': 115,
    'Finanzen': 125,
    'Industrie': 90,
    'Handel': 75,
    'Gesundheit': 85,
    'Energie': 100,
    'Sonstiges': 85
  };

  // Gesparte Stunden pro Woche pro Mitarbeiter (konservativ)
  const PAIN_POINT_SAVINGS_HOURS = {
    'Belegverarbeitung': 3.5,
    'Kundenanfragen': 2.5,
    'Datenanalyse': 1.8,
    'Angebotserstellung': 2.0,
    'Prozess-Dokumentation': 1.2,
    'Datenstrategie': 0.7
  };

  // Text-Empfehlungen
  const RECOMMENDATIONS = {
    'Belegverarbeitung': 'Automatisches Document Processing mit OCR & RPA',
    'Kundenanfragen': 'KI-Agenten für Chatbot & E-Mail-Verarbeitung 24/7',
    'Datenanalyse': 'Automatisierte Dashboards mit Predictive Analytics',
    'Angebotserstellung': 'Generative KI für Template-basierte Offerten',
    'Prozess-Dokumentation': 'Auto-Erfassung von Prozessen während der Arbeit',
    'Datenstrategie': 'Data Warehouse Aufbau & Governance-Framework'
  };

  // Implementierungskosten (für ROI-Berechnung)
  const IMPLEMENTATION_COSTS = {
    'Buchhaltung': 35000,
    'Immobilien': 32000,
    'Handwerk': 28000,
    'Versicherung': 45000,
    'Finanzen': 50000,
    'Industrie': 42000,
    'Handel': 30000,
    'Gesundheit': 28000,
    'Energie': 40000,
    'Sonstiges': 25000
  };

  // === EVENT LISTENERS ===

  document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', handleStepNavigation);
  });

  if (form) form.addEventListener('submit', handleSubmit);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.querySelectorAll('#cta-primary, #open-assessment').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const bookBtn = document.getElementById('book-meet');
  const closeResBtn = document.getElementById('close-result');

  if (bookBtn) {
    bookBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const contact = window.assessmentData?.contact || {};
      window.location.href = `pages/kontakt.html?name=${encodeURIComponent(contact.name || '')}&email=${encodeURIComponent(contact.email || '')}`;
    });
  }

  if (closeResBtn) {
    closeResBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // === FUNKTIONEN ===

  function openModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'flex';
    const firstInput = modal.querySelector('input');
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
    setTimeout(() => {
      form.reset();
      goToStep(1);
    }, 300);
  }

  function handleStepNavigation(e) {
    const action = e.target.dataset.action;
    const stepContainer = e.target.closest('.step');
    const stepNum = parseInt(stepContainer.dataset.step);

    if (action === 'next') {
      if (validateStep(stepNum)) {
        goToStep(stepNum + 1);
      }
    } else if (action === 'back') {
      goToStep(stepNum - 1);
    }
  }

  function validateStep(step) {
    const stepEl = document.querySelector(`.step[data-step="${step}"]`);
    const inputs = stepEl.querySelectorAll('input[required]');
    let isValid = true;
    let firstError = null;

    inputs.forEach(input => {
      let inputValid = true;

      if (input.type === 'radio') {
        const groupName = input.name;
        const checked = stepEl.querySelector(`input[name="${groupName}"]:checked`);
        if (!checked) inputValid = false;
      } else if (input.type === 'email') {
        if (!input.value.trim() || !input.value.includes('@')) inputValid = false;
      } else {
        if (!input.value.trim()) inputValid = false;
      }

      if (!inputValid) {
        isValid = false;
        input.classList.add('error');
        if (!firstError) firstError = input;

        input.addEventListener('input', () => input.classList.remove('error'), { once: true });
        input.addEventListener('change', () => input.classList.remove('error'), { once: true });
      }
    });

    if (!isValid && firstError) {
      firstError.focus();
    }

    return isValid;
  }

  function goToStep(step) {
    if (step < 1 || step > 4) return;

    currentStep = step;

    steps.forEach(s => {
      s.hidden = true;
      s.style.display = 'none';
    });

    const currentEl = document.querySelector(`.step[data-step="${step}"]`);
    if (currentEl) {
      currentEl.hidden = false;
      currentEl.style.display = 'block';
    }

    if (progressBar) {
      const percent = ((step - 1) / 3) * 100;
      progressBar.style.width = `${percent}%`;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep(3)) return;

    const formData = new FormData(form);
    const branche = formData.get('branche');
    const size = formData.get('company_size');
    const pains = formData.getAll('pain');
    const name = formData.get('name');
    const email = formData.get('email');

    // === THE SWISS FORMULA ===
    const employeeCount = COMPANY_SIZE_AVG[size] || 10;
    const hourlyRate = HOURLY_RATES_CHF[branche] || 85;

    let hoursSavedPerEmployee = 0;
    pains.forEach(pain => {
      hoursSavedPerEmployee += (PAIN_POINT_SAVINGS_HOURS[pain] || 0.5);
    });
    hoursSavedPerEmployee = Math.min(hoursSavedPerEmployee, 12);

    // Jahresersparnis: MA × h/Wo × 48 Wochen × CHF/h × 0.75 (Effizienzfaktor)
    const annualSavings = employeeCount * hoursSavedPerEmployee * 48 * hourlyRate * 0.75;
    const totalSavings = Math.max(Math.round(annualSavings / 1000) * 1000, 5000);

    // Score (0-95)
    let score = 45;
    score += pains.length * 12;
    if (size === 'medium') score += 8;
    if (size === 'large') score += 20;
    score = Math.min(score, 95);

    const recommendations = pains.slice(0, 3).map(p => RECOMMENDATIONS[p] || 'KI-Integration');

    // ROI berechnen
    const implCost = IMPLEMENTATION_COSTS[branche] || 35000;
    const roiMonths = Math.round((implCost / (totalSavings / 12)) * 10) / 10;

    window.assessmentData = {
      score,
      branche,
      totalSavings,
      roiMonths,
      implCost,
      contact: { name, email }
    };

    displayResults(score, branche, totalSavings, roiMonths, implCost, recommendations);
  }

  function displayResults(score, branche, savings, roiMonths, implCost, recList) {
    let levelText = 'Moderat';
    let color = '#8B5CF6';

    if (score >= 85) {
      levelText = 'KRITISCH';
      color = '#00FF88';
    } else if (score >= 70) {
      levelText = 'SEHR HOCH';
      color = '#00FFFF';
    } else if (score >= 55) {
      levelText = 'HOCH';
      color = '#FFB347';
    }

    const scoreEl = document.getElementById('result-score');
    const summaryEl = document.getElementById('result-summary');
    const savingsEl = document.getElementById('result-savings');
    const roiEl = document.getElementById('result-roi');
    const recUl = document.getElementById('result-recommendations');

    if (scoreEl) {
      scoreEl.textContent = `${score}/100`;
      scoreEl.style.color = color;
    }

    if (summaryEl) {
      summaryEl.innerHTML = `
        <strong style="color: ${color}; font-size: 1.1rem;">KI-Potenzial: ${levelText}</strong>
        <p style="margin-top: 0.75rem; font-size: 0.9rem; color: #ccc;">
          Basierend auf KMU-Durchschnitte in <span style="color:#fff">${branche}</span>. Reale Einsparungen hängen von Implementierung & Prozessreife ab.
        </p>
      `;
    }

    if (savingsEl) {
      savingsEl.innerHTML = `<strong style="font-size: 1.3rem;">CHF ${savings.toLocaleString('de-CH')}</strong> <span style="font-size: 0.9rem; color: #888;">pro Jahr</span>`;
    }

    if (roiEl && roiMonths) {
      roiEl.innerHTML = `<small style="color: #888;">Amortisation nach ~${roiMonths} Monaten (kalkuliert mit CHF ${implCost.toLocaleString('de-CH')} Implementierung)</small>`;
    }

    if (recUl) {
      recUl.innerHTML = '';
      if (recList.length === 0) recList.push('Allgemeine KI-Strategie-Analyse');

      recList.forEach(rec => {
        const li = document.createElement('li');
        li.textContent = rec;
        li.style.marginBottom = '0.5rem';
        li.style.color = '#fff';
        recUl.appendChild(li);
      });
    }

    goToStep(4);
  }
});
