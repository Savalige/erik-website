const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

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
    setError('name', 'Please enter your name.');
    ok = false;
  } else {
    setError('name', '');
  }

  const email = document.getElementById('email').value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError('email', 'Please enter your email address.');
    ok = false;
  } else if (!emailRe.test(email)) {
    setError('email', 'Please enter a valid email address.');
    ok = false;
  } else {
    setError('email', '');
  }

  const message = document.getElementById('message').value.trim();
  if (!message) {
    setError('message', 'Please enter a message.');
    ok = false;
  } else {
    setError('message', '');
  }

  return ok;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  successMsg.hidden = true;

  if (!validate()) return;

  // TODO: replace with a real form endpoint (e.g. Formspree, Netlify Forms)
  // fetch('https://formspree.io/f/YOUR_ID', { method: 'POST', body: new FormData(form) })

  form.reset();
  successMsg.hidden = false;
  successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Clear errors on input
['name', 'email', 'message'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', function () {
    setError(id, '');
  });
});
