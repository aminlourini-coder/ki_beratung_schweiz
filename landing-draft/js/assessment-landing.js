/**
 * KI-Potenzial Assessment - Landing Page Edition
 * Optimiert für Conversion & Lead-Generierung
 */

(function() {
  'use strict';

  // === CONFIG ===
  const COMPANY_SIZE_AVG = {
    'micro': 1.5,
    'small': 10,
    'medium': 40,
    'large': 140
  };

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

  const PAIN_POINT_SAVINGS_HOURS = {
    'Belegverarbeitung': 3.5,
    'Kundenanfragen': 2.5,
    'Datenanalyse': 1.8,
    'Angebotserstellung': 2.0,
    'Prozess-Dokumentation': 1.2,
    'Datenstrategie': 0.7
  };

  const RECOMMENDATIONS = {
    'Belegverarbeitung': 'Automatisches Document Processing mit OCR & RPA',
    'Kundenanfragen': 'KI-Chatbot & E-Mail-Verarbeitung 24/7',
    'Datenanalyse': 'Automatisierte Dashboards mit Predictive Analytics',
    'Angebotserstellung': 'Generative KI für Template-basierte Offerten',
    'Prozess-Dokumentation': 'Auto-Erfassung von Prozessen während der Arbeit',
    'Datenstrategie': 'Data Warehouse Aufbau & Governance'
  };

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

  // === STATE ===
  let currentStep = 1;

  // === DOM INIT ===
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    const modal = document.getElementById('assessment-modal');
    const form = document.getElementById('assessment-form');
    const closeBtn = document.getElementById('modal-close');
    const progressBar = document.getElementById('progress-bar');

    if (!modal || !form) return;

    // Open modal triggers
    document.querySelectorAll('a[href="#audit"], .btn-primary[href*="audit"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Close modal
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    // Navigation buttons
    form.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action === 'next') {
        e.preventDefault();
        const stepEl = e.target.closest('.step');
        const step = parseInt(stepEl.dataset.step);
        if (validateStep(step)) {
          goToStep(step + 1);
        }
      } else if (action === 'back') {
        e.preventDefault();
        const stepEl = e.target.closest('.step');
        const step = parseInt(stepEl.dataset.step);
        goToStep(step - 1);
      }
    });

    // Form submit
    form.addEventListener('submit', handleSubmit);

    // Book meeting button
    const bookBtn = document.getElementById('book-meeting');
    if (bookBtn) {
      bookBtn.addEventListener('click', (e) => {
        closeModal();
        setTimeout(() => {
          document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
        }, 300);
      });
    }

    // Hover effects for radio/checkbox labels
    form.querySelectorAll('label').forEach(label => {
      label.addEventListener('mouseenter', () => {
        label.style.transform = 'translateX(5px)';
        label.style.borderColor = 'rgba(0, 255, 255, 0.5)';
      });
      label.addEventListener('mouseleave', () => {
        label.style.transform = 'translateX(0)';
        const input = label.querySelector('input');
        if (!input.checked) {
          label.style.borderColor = input.type === 'radio' ? 'rgba(0, 255, 136, 0.2)' : 'rgba(0, 255, 255, 0.2)';
        }
      });
      label.addEventListener('click', () => {
        label.style.borderColor = 'rgba(0, 255, 255, 0.6)';
        label.style.background = 'rgba(0, 255, 255, 0.12)';
      });
    });
  }

  function openModal() {
    const modal = document.getElementById('assessment-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Track event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_started', {
        event_category: 'engagement',
        event_label: 'KI Potenzial Check'
      });
    }
  }

  function closeModal() {
    const modal = document.getElementById('assessment-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
    
    setTimeout(() => {
      const form = document.getElementById('assessment-form');
      if (form) form.reset();
      goToStep(1);
    }, 300);
  }

  function goToStep(step) {
    if (step < 1 || step > 4) return;
    
    currentStep = step;
    
    const steps = document.querySelectorAll('.step');
    steps.forEach(s => s.style.display = 'none');
    
    const current = document.querySelector(`.step[data-step="${step}"]`);
    if (current) current.style.display = 'block';
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
      const percent = ((step - 1) / 3) * 100;
      progressBar.style.width = `${percent}%`;
    }
    
    // Scroll to top of modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) modalContent.scrollTop = 0;
  }

  function validateStep(step) {
    const stepEl = document.querySelector(`.step[data-step="${step}"]`);
    if (!stepEl) return false;
    
    const inputs = stepEl.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      let inputValid = true;
      
      if (input.type === 'radio') {
        const groupName = input.name;
        const checked = stepEl.querySelector(`input[name="${groupName}"]:checked`);
        if (!checked) {
          inputValid = false;
          // Highlight all radio options
          stepEl.querySelectorAll(`input[name="${groupName}"]`).forEach(radio => {
            const label = radio.closest('label');
            if (label) {
              label.style.borderColor = 'rgba(255, 107, 53, 0.5)';
              label.style.background = 'rgba(255, 107, 53, 0.08)';
            }
          });
        }
      } else if (input.type === 'email') {
        if (!input.value.trim() || !input.value.includes('@')) {
          inputValid = false;
          input.style.borderColor = 'rgba(255, 107, 53, 0.5)';
          input.style.background = 'rgba(255, 107, 53, 0.08)';
        }
      } else {
        if (!input.value.trim()) {
          inputValid = false;
          input.style.borderColor = 'rgba(255, 107, 53, 0.5)';
          input.style.background = 'rgba(255, 107, 53, 0.08)';
        }
      }
      
      if (!inputValid) isValid = false;
      
      // Reset on input
      input.addEventListener('input', () => {
        input.style.borderColor = 'rgba(0, 255, 255, 0.2)';
        input.style.background = 'rgba(0, 255, 255, 0.05)';
      }, { once: true });
      
      input.addEventListener('change', () => {
        const label = input.closest('label');
        if (label) {
          label.style.borderColor = 'rgba(0, 255, 255, 0.2)';
          label.style.background = 'rgba(0, 255, 255, 0.05)';
        }
      }, { once: true });
    });
    
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    const formData = new FormData(e.target);
    const branche = formData.get('branche');
    const size = formData.get('company_size');
    const pains = formData.getAll('pain');
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    
    // Calculate
    const employeeCount = COMPANY_SIZE_AVG[size] || 10;
    const hourlyRate = HOURLY_RATES_CHF[branche] || 85;
    
    let hoursSavedPerEmployee = 0;
    pains.forEach(pain => {
      hoursSavedPerEmployee += (PAIN_POINT_SAVINGS_HOURS[pain] || 0.5);
    });
    hoursSavedPerEmployee = Math.min(hoursSavedPerEmployee, 12);
    
    const annualSavings = employeeCount * hoursSavedPerEmployee * 48 * hourlyRate * 0.75;
    const totalSavings = Math.max(Math.round(annualSavings / 1000) * 1000, 5000);
    
    let score = 45;
    score += pains.length * 12;
    if (size === 'medium') score += 8;
    if (size === 'large') score += 20;
    score = Math.min(score, 95);
    
    const recommendations = pains.slice(0, 3).map(p => RECOMMENDATIONS[p] || 'KI-Integration');
    
    const implCost = IMPLEMENTATION_COSTS[branche] || 35000;
    const roiMonths = Math.round((implCost / (totalSavings / 12)) * 10) / 10;
    
    // Display
    displayResults(score, branche, totalSavings, roiMonths, implCost, recommendations);
    
    // Track
    if (typeof gtag !== 'undefined') {
      gtag('event', 'assessment_completed', {
        event_category: 'conversion',
        event_label: branche,
        value: Math.round(totalSavings)
      });
    }
    
    // Send to backend (optional)
    sendLead({
      name,
      email,
      phone,
      branche,
      size,
      pains: pains.join(', '),
      score,
      totalSavings,
      roiMonths
    });
  }

  function displayResults(score, branche, savings, roiMonths, implCost, recList) {
    let levelText = 'Moderat';
    let color = '#8B5CF6';
    
    if (score >= 85) {
      levelText = 'KRITISCH HOCH';
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
      scoreEl.style.textShadow = `0 0 30px ${color}80`;
    }
    
    if (summaryEl) {
      summaryEl.innerHTML = `
        <strong style="color: ${color}; font-size: 1.2rem;">KI-Potenzial: ${levelText}</strong>
        <p style="margin-top: 1rem; font-size: 0.95rem; color: #B3B3B3; line-height: 1.6;">
          Basierend auf KMU-Durchschnitte in <span style="color:#FFF; font-weight: 600;">${branche}</span>. 
          Die realen Einsparungen hängen von Ihrer Implementierung & Prozessreife ab.
        </p>
      `;
    }
    
    if (savingsEl) {
      savingsEl.innerHTML = `CHF ${savings.toLocaleString('de-CH')} <span style="font-size: 1rem; color: #808080;">pro Jahr</span>`;
    }
    
    if (roiEl && roiMonths) {
      roiEl.innerHTML = `Amortisation nach ca. <strong style="color: #00FF88;">${roiMonths} Monaten</strong> (kalkuliert mit CHF ${implCost.toLocaleString('de-CH')} Implementierungskosten)`;
    }
    
    if (recUl) {
      recUl.innerHTML = '';
      if (recList.length === 0) recList.push('Allgemeine KI-Strategie-Analyse');
      
      recList.forEach(rec => {
        const li = document.createElement('li');
        li.innerHTML = `<span style="color: #00FFFF; margin-right: 0.5rem;">▶</span> ${rec}`;
        li.style.color = '#FFF';
        li.style.marginBottom = '0.75rem';
        li.style.paddingLeft = '0.5rem';
        recUl.appendChild(li);
      });
    }
    
    goToStep(4);
  }

  function sendLead(data) {
    // Send to Formspree or your backend
    fetch('https://formspree.io/f/xanyzvrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        _subject: 'Neuer KI-Potenzial-Check Lead',
        type: 'assessment_lead'
      })
    }).catch(err => console.log('Lead tracking error:', err));
  }

})();
