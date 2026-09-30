/**
 * Toy Haven - Feedback & FAQ Support
 * Module: COMP40053 Assignment 3 | University of Staffordshire
 * 
 * Features:
 * 1. Form validation with custom errors (Name, Email, Message, Subject)
 * 2. Store user feedback in localStorage ('toyhaven_feedback')
 * 3. Animated confirmation alert message
 * 4. Interactive FAQ accordion with ARIA accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  initSupportPage();
  initFaqAccordion();
});

// ---------------------------------------------------------------------------
// 1. Support & Feedback Form Validation and Storage
// ---------------------------------------------------------------------------
function initSupportPage() {
  const form = document.getElementById('support-form');
  const alertBox = document.getElementById('support-success-alert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // 1. Name validation
    const nameInput = document.getElementById('support-name');
    const nameVal = nameInput?.value.trim() || '';
    if (!nameVal || nameVal.length < 2) {
      setFieldError(nameInput, true);
      isValid = false;
    } else {
      setFieldError(nameInput, false);
    }

    // 2. Email validation
    const emailInput = document.getElementById('support-email');
    const emailVal = emailInput?.value.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      setFieldError(emailInput, true);
      isValid = false;
    } else {
      setFieldError(emailInput, false);
    }

    // 3. Subject validation
    const subjectSelect = document.getElementById('support-subject');
    const subjectVal = subjectSelect?.value || '';
    if (!subjectVal) {
      setFieldError(subjectSelect, true);
      isValid = false;
    } else {
      setFieldError(subjectSelect, false);
    }

    // 4. Message validation
    const msgInput = document.getElementById('support-message');
    const msgVal = msgInput?.value.trim() || '';
    if (!msgVal || msgVal.length < 10) {
      setFieldError(msgInput, true);
      isValid = false;
    } else {
      setFieldError(msgInput, false);
    }

    if (!isValid) {
      showToast('Please fix the errors in the form.', 'error');
      return;
    }

    // Prepare Feedback Record
    const feedbackRecord = {
      id: 'FB-' + Date.now(),
      submittedAt: new Date().toISOString(),
      name: nameVal,
      email: emailVal,
      subject: subjectVal,
      message: msgVal
    };

    // Store in localStorage
    try {
      const storedFeedback = JSON.parse(localStorage.getItem('toyhaven_feedback') || '[]');
      storedFeedback.unshift(feedbackRecord);
      localStorage.setItem('toyhaven_feedback', JSON.stringify(storedFeedback));
    } catch (err) {
      console.error('Failed to store feedback in localStorage:', err);
    }

    // Show Confirmation Message
    form.reset();
    showToast('Your message has been sent successfully!', 'success');

    if (alertBox) {
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 6000);
    }
  });
}

function setFieldError(inputEl, isError) {
  if (!inputEl) return;
  inputEl.classList.toggle('is-invalid', isError);
  const errorMsg = inputEl.parentElement.querySelector('.form-error');
  if (errorMsg) {
    errorMsg.style.display = isError ? 'block' : 'none';
  }
}

// ---------------------------------------------------------------------------
// 2. FAQ Accordion Implementation
// ---------------------------------------------------------------------------
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const collapse = item.querySelector('.accordion-collapse');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Optional: Close sibling accordions for clean single-expanded view
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-expanded');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherCollapse = otherItem.querySelector('.accordion-collapse');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherCollapse) otherCollapse.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        item.classList.remove('is-expanded');
        collapse.style.maxHeight = null;
      } else {
        header.setAttribute('aria-expanded', 'true');
        item.classList.add('is-expanded');
        collapse.style.maxHeight = collapse.scrollHeight + 'px';
      }
    });

    // Keyboard support for Accordions (Enter or Space)
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
}
