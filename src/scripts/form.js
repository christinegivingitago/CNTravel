/* Plan My Trip — AJAX submit to Formspree with inline confirmation.
   Falls back to a normal POST + redirect if fetch/JS is unavailable. */

const form = document.getElementById('trip-form');
if (form) {
  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'Form not yet connected — add your Formspree form ID in plan-my-trip.html.';
      status.style.color = 'var(--color-blush-deep)';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        status.textContent = "Thank you — your inquiry has been sent. We'll be in touch shortly.";
        status.style.color = 'var(--color-sage-deep)';
        submitBtn.textContent = 'Submitted';
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please email us directly at christine@christinenoelletravel.com.";
      status.style.color = 'var(--color-blush-deep)';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Inquiry';
    }
  });
}
