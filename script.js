// Replace YOUR_FORM_ID with your Formspree form ID from formspree.io/forms
const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';

const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successMsg = document.getElementById('form-success');
const errorMsg = document.getElementById('form-error');

function setError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const errEl = document.getElementById(fieldId + '-error');
  field.classList.toggle('invalid', !!msg);
  if (errEl) errEl.textContent = msg;
}

function validate() {
  let ok = true;

  const name = document.getElementById('name').value.trim();
  if (!name) {
    setError('name', 'Ange ditt namn.');
    ok = false;
  } else {
    setError('name', '');
  }

  const email = document.getElementById('email').value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('email', 'Ange din e-postadress.');
    ok = false;
  } else if (!emailRe.test(email)) {
    setError('email', 'Ange en giltig e-postadress.');
    ok = false;
  } else {
    setError('email', '');
  }

  const message = document.getElementById('message').value.trim();
  if (!message) {
    setError('message', 'Ange ett meddelande.');
    ok = false;
  } else {
    setError('message', '');
  }

  return ok;
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  successMsg.hidden = true;
  errorMsg.hidden = true;

  if (!validate()) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Skickar…';

  try {
    const res = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    });

    if (res.ok) {
      form.reset();
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      errorMsg.hidden = false;
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch {
    errorMsg.hidden = false;
    errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Skicka meddelande';
  }
});

['name', 'email', 'message'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', function () {
    setError(id, '');
  });
});
