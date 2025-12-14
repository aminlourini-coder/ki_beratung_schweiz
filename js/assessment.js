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

  // === ENTERPRISE: INDUSTRY DATA (9 Branchen) ===
  const INDUSTRY_DATA = {
    'Buchhaltung': {
      rate: 115,
      pains: [
        { id: 'belege', label: 'Belege abtippen & Kreditoren erfassen', hours: 5.5, rec: 'OCR-Pipeline & Auto-Verbuchung' },
        { id: 'kommunikation', label: 'Rückfragen an Mandanten ("Beleg fehlt")', hours: 3.0, rec: 'Automatisierte E-Mail-Workflows' },
        { id: 'abstimmung', label: 'Bankabgleich & Differenzen suchen', hours: 2.5, rec: 'KI-Abstimmungs-Agent' },
        { id: 'jahresabschluss', label: 'Jahresabschluss-Plausibilisierung', hours: 4.0, rec: 'Anomalie-Erkennung & Checklisten' }
      ]
    },
    'Immobilien': {
      rate: 100,
      pains: [
        { id: 'schaden', label: 'Schadensmeldungen (Telefon/Mail-Flut)', hours: 6.0, rec: 'KI-Ticket-Triage & Handwerker-Beauftragung' },
        { id: 'inserate', label: 'Inserate schreiben & Bilder optimieren', hours: 3.0, rec: 'Generative KI für Exposés' },
        { id: 'besichtigungen', label: 'Termin-Koordination Besichtigungen', hours: 4.0, rec: '24/7 Termin-Bot & Kalender-Sync' },
        { id: 'admin', label: 'Mietvertrags-Erstellung & NK-Abrechnung', hours: 2.5, rec: 'Dokumenten-Automation' }
      ]
    },
    'Handwerk': {
      rate: 90,
      pains: [
        { id: 'offerten', label: 'Offerten schreiben am Samstagabend', hours: 5.0, rec: 'Voice-to-Offerte (Sprache zu PDF)' },
        { id: 'rapporte', label: 'Unleserliche Rapporte abtippen', hours: 3.5, rec: 'Foto-zu-Text Erfassung per App' },
        { id: 'terminplanung', label: 'Einsatzplanung & Notfall-Koordination', hours: 4.0, rec: 'Intelligente Dispo-Planung' },
        { id: 'material', label: 'Materialbestellung & Lager-Chaos', hours: 2.0, rec: 'Bestellvorschläge via Bilderkennung' }
      ]
    },
    'Versicherung': {
      rate: 120,
      pains: [
        { id: 'triage', label: 'Schadensfall-Prüfung & Triage', hours: 6.0, rec: 'KI-Schadensanalyse & Dunkelverarbeitung' },
        { id: 'policen', label: 'Policen-Vergleich (Kleingedrucktes)', hours: 3.5, rec: 'Semantische Dokumenten-Suche' },
        { id: 'emails', label: 'E-Mail Flut im Innendienst', hours: 5.0, rec: 'Auto-Drafting für Kundenantworten' },
        { id: 'compliance', label: 'GWG-Prüfung & Compliance', hours: 2.0, rec: 'Auto-KYC Prüfung' }
      ]
    },
    'Finanzen': {
      rate: 130,
      pains: [
        { id: 'reporting', label: 'Manuelles Reporting & Excel-Merge', hours: 5.5, rec: 'Automatisierte BI-Dashboards' },
        { id: 'kyc', label: 'KYC-Prozesse & Onboarding', hours: 4.0, rec: 'Dokumenten-Check via KI' },
        { id: 'analyse', label: 'Marktanalyse & Research', hours: 3.0, rec: 'KI-Research-Assistent' },
        { id: 'support', label: 'First-Level Support Anfragen', hours: 3.5, rec: 'Secure Banking Chatbot' }
      ]
    },
    'Industrie': {
      rate: 95,
      pains: [
        { id: 'wartung', label: 'Ungeplante Maschinenstillstände', hours: 4.0, rec: 'Predictive Maintenance (IoT)' },
        { id: 'qm', label: 'Manuelle Qualitätskontrolle', hours: 3.5, rec: 'Computer Vision Fehlererkennung' },
        { id: 'schicht', label: 'Komplexe Schichtplanung', hours: 3.0, rec: 'KI-Personaleinsatzplanung' },
        { id: 'zertifikate', label: 'Verwaltung von Materialzeugnissen', hours: 2.5, rec: 'Zertifikats-Scanner & Ablage' }
      ]
    },
    'Handel': {
      rate: 85,
      pains: [
        { id: 'content', label: 'Produkttexte schreiben (SEO)', hours: 5.0, rec: 'Massenerstellung von Produktbeschreibungen' },
        { id: 'support', label: 'Support-Tickets ("Wo ist mein Paket")', hours: 6.0, rec: 'E-Commerce Support-Bot' },
        { id: 'retouren', label: 'Retouren-Klassifizierung', hours: 3.0, rec: 'Retouren-Analyse-Tool' },
        { id: 'preise', label: 'Konkurrenz-Preisanalyse', hours: 2.0, rec: 'Dynamic Pricing Agent' }
      ]
    },
    'Gesundheit': {
      rate: 110,
      pains: [
        { id: 'berichte', label: 'Arztberichte schreiben nach Feierabend', hours: 6.0, rec: 'Whisper-Med (Diktat zu Text)' },
        { id: 'noshows', label: 'Terminausfälle & Nachrücker', hours: 2.5, rec: 'Auto-Recall & Wartelisten-Bot' },
        { id: 'abrechnung', label: 'TARMED/Abrechnungs-Rückweisungen', hours: 3.5, rec: 'Abrechnungs-Validierungs-KI' },
        { id: 'anamnese', label: 'Manuelle Datenübernahme (Anamnese)', hours: 2.0, rec: 'Formular-Digitalisierung' }
      ]
    },
    'Energie': {
      rate: 105,
      pains: [
        { id: 'zaehler', label: 'Zählerdaten validieren (Plausibilisierung)', hours: 4.5, rec: 'Anomalie-Erkennung Verbrauch' },
        { id: 'kundenservice', label: 'Anfragen zu Rechnungen/Abschlägen', hours: 5.0, rec: 'Self-Service Kundenportal mit KI' },
        { id: 'prognose', label: 'Lastprognose & Einkaufsplanung', hours: 3.0, rec: 'Predictive Energy Analytics' },
        { id: 'netz', label: 'Wartungsplanung Netzinfrastruktur', hours: 3.5, rec: 'Infrastruktur-Monitoring' }
      ]
    },
    'Sonstiges': {
      rate: 90,
      pains: [
        { id: 'excel', label: 'Manuelle Datenpflege in Excel', hours: 4.0, rec: 'Prozess-Automatisierung (RPA)' },
        { id: 'emails', label: 'Standard-E-Mails beantworten', hours: 3.5, rec: 'Smart Reply Assistant' },
        { id: 'suche', label: 'Interne Informationen suchen', hours: 2.5, rec: 'Enterprise Knowledge Base (RAG)' },
        { id: 'meeting', label: 'Meeting-Protokolle schreiben', hours: 2.0, rec: 'Meeting-Transkription & Summary' }
      ]
    }
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
    
    // NEUE FELDER (aus Step 2)
    const digitalLevel = formData.get('digital_level') || 'mid';
    const errorRate = formData.get('error_rate') || 'mid';

    // === THE SWISS FORMULA (ERWEITERT) ===
    const employeeCount = COMPANY_SIZE_AVG[size] || 10;
    const industryData = INDUSTRY_DATA[branche] || INDUSTRY_DATA['Sonstiges'];
    const hourlyRate = industryData.rate || 90;

    // 1. BASIS: ZEITERSPARNIS
    let hoursSavedPerEmployee = 0;
    pains.forEach(pain => {
      const painData = industryData.pains.find(p => p.id === pain);
      if (painData) {
        hoursSavedPerEmployee += painData.hours;
      }
    });
    hoursSavedPerEmployee = Math.min(hoursSavedPerEmployee, 15);

    const annualTimeSavings = employeeCount * hoursSavedPerEmployee * 48 * hourlyRate * 0.85;

    // 2. NEU: FEHLERKOSTEN-REDUKTION (Quality Impact)
    // Annahme: Ein Fehler kostet im Schnitt 150 CHF
    const errorFactors = { 'low': 0.5, 'mid': 1.5, 'high': 3.0 };
    const errorsPerWeek = (errorFactors[errorRate] || 1.0) * employeeCount;
    // KI reduziert Fehler um 80%
    const annualErrorSavings = errorsPerWeek * 150 * 48 * 0.80;

    // 3. NEU: OPPORTUNITÄTSKOSTEN (Growth Impact)
    // Gewonnene Stunden für wertschöpfende Arbeit (50% der Zeit, 1.5x Marge)
    const growthPotential = (hoursSavedPerEmployee * employeeCount * 48) * 0.5 * (hourlyRate * 1.5);

    // TOTAL SAVINGS (Zeit + Fehler)
    const totalSavings = Math.round((annualTimeSavings + annualErrorSavings) / 1000) * 1000;
    const errorSavingsRounded = Math.round(annualErrorSavings);

    // Score (mit Digital-Level & Error-Rate Boost)
    let score = 50;
    score += pains.length * 10;
    
    let readinessScore = 0;
    if (digitalLevel === 'high') readinessScore = 20;
    if (digitalLevel === 'mid') readinessScore = 10;
    if (digitalLevel === 'low') readinessScore = 5;
    score += readinessScore;
    
    if (errorRate === 'high') score += 10;
    score = Math.min(score, 98);

    // Implementierungskosten (Digital-Level Faktor)
    let implCost = IMPLEMENTATION_COSTS[branche] || 30000;
    if (digitalLevel === 'low') implCost *= 1.5;   // Digitalisierung nötig → teurer
    if (digitalLevel === 'high') implCost *= 0.8;  // Cloud-ready → günstiger

    // ROI berechnen (mit Growth-Faktor)
    const roiMonths = Math.round((implCost / ((totalSavings + (growthPotential * 0.2)) / 12)) * 10) / 10;

    // Recommendations
    const recommendations = pains.slice(0, 3).map(p => {
      const painData = industryData.pains.find(x => x.id === p);
      return painData ? painData.rec : 'KI-Integration';
    });

    // Speichern für Dashboard
    window.assessmentData = {
      score,
      branche,
      branchLabel: branche,
      savings: totalSavings,
      errorSavings: errorSavingsRounded,
      growth: Math.round(growthPotential),
      roiMonths,
      implCost,
      weeklyHours: hoursSavedPerEmployee,
      co2Saved: Math.round((totalSavings / hourlyRate) * 0.05), // Grobe Schätzung
      pains: pains,
      branchData: industryData,
      contact: { name, email },
      readiness: digitalLevel,
      errorRate: errorRate,
      color: score >= 85 ? '#00FF88' : score >= 70 ? '#00FFFF' : score >= 55 ? '#FFB347' : '#8B5CF6',
      level: score >= 85 ? 'KRITISCH' : score >= 70 ? 'SEHR HOCH' : score >= 55 ? 'HOCH' : 'Moderat'
    };

    // Redirect to Dashboard
    window.location.href = 'landing-draft/dashboard.html';
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
