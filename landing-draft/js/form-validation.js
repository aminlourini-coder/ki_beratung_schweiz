// Enhanced Form Validation and UX
function initFormValidation() {
  // Validiere alle Formulare auf der Seite
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Email Validierung
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
      input.addEventListener('blur', validateEmail);
      input.addEventListener('input', clearError);
    });
    
    // Text Validierung
    const textInputs = form.querySelectorAll('input[type="text"][required]');
    textInputs.forEach(input => {
      input.addEventListener('blur', validateText);
      input.addEventListener('input', clearError);
    });
    
    // Tel Validierung
    const telInputs = form.querySelectorAll('input[type="tel"]');
    telInputs.forEach(input => {
      input.addEventListener('blur', validatePhone);
      input.addEventListener('input', clearError);
    });
    
    // Form Submit
    form.addEventListener('submit', handleFormSubmit);
  });
}

function validateEmail(e) {
  const input = e.target;
  const email = input.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    showError(input, 'Email ist erforderlich');
    return false;
  }
  
  if (!emailRegex.test(email)) {
    showError(input, 'Bitte geben Sie eine gültige Email-Adresse ein');
    return false;
  }
  
  clearError(input);
  return true;
}

function validateText(e) {
  const input = e.target;
  const text = input.value.trim();
  const minLength = input.getAttribute('minlength') || 2;
  
  if (!text) {
    showError(input, 'Dieses Feld ist erforderlich');
    return false;
  }
  
  if (text.length < minLength) {
    showError(input, `Mindestens ${minLength} Zeichen erforderlich`);
    return false;
  }
  
  clearError(input);
  return true;
}

function validatePhone(e) {
  const input = e.target;
  const phone = input.value.trim();
  
  if (!phone) {
    clearError(input);
    return true; // Optional field
  }
  
  // Einfache Phone-Validierung: nur Zahlen, +, -, Leerzeichen
  const phoneRegex = /^[+0-9\-\s()]+$/;
  
  if (!phoneRegex.test(phone)) {
    showError(input, 'Ungültiges Telefonnummernformat');
    return false;
  }
  
  clearError(input);
  return true;
}

function showError(input, message) {
  // Entferne existierenden Error
  const existingError = input.parentElement.querySelector('.form-error');
  if (existingError) existingError.remove();
  
  // Add visual error state
  input.style.borderColor = '#FF6B35';
  input.style.backgroundColor = 'rgba(255, 107, 53, 0.1)';
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.style.cssText = `
    color: #FF6B35;
    font-size: 0.85rem;
    margin-top: 0.5rem;
    display: block;
  `;
  errorDiv.textContent = message;
  
  input.parentElement.appendChild(errorDiv);
}

function clearError(e) {
  const input = typeof e === 'string' ? document.querySelector(e) : (e.target || e);
  input.style.borderColor = 'rgba(0,255,255,0.2)';
  input.style.backgroundColor = 'rgba(0,255,255,0.05)';
  
  const errorDiv = input.parentElement.querySelector('.form-error');
  if (errorDiv) errorDiv.remove();
}

function handleFormSubmit(e) {
  // Validiere alle erforderlichen Felder vor Submit
  const form = e.target;
  const requiredInputs = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredInputs.forEach(input => {
    if (input.type === 'email') {
      if (!validateEmail({target: input})) isValid = false;
    } else if (input.type === 'tel') {
      if (!validatePhone({target: input})) isValid = false;
    } else if (input.type === 'text') {
      if (!validateText({target: input})) isValid = false;
    } else if (input.type === 'radio' || input.type === 'checkbox') {
      const group = form.querySelectorAll(`[name="${input.name}"]:checked`);
      if (group.length === 0) {
        showError(input, 'Bitte wählen Sie eine Option');
        isValid = false;
      }
    }
  });
  
  if (!isValid) {
    e.preventDefault();
    // Scroll zu erstem Error
    const firstError = form.querySelector('.form-error');
    if (firstError) {
      firstError.scrollIntoView({behavior: 'smooth', block: 'center'});
    }
  }
}

// Initialisiere bei DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

// Live validation for email auf Eingabe
document.querySelectorAll('input[type="email"]').forEach(input => {
  input.addEventListener('input', (e) => {
    if (e.target.value.includes('@')) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      if (isValid) {
        e.target.style.borderColor = 'rgba(0, 255, 136, 0.5)';
      }
    }
  });
});
