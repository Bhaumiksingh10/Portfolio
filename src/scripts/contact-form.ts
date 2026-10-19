// Progressive enhancement for the contact form.
// Without JS the form posts straight to Web3Forms and redirects to /thanks/.
// With JS: friendly inline validation, an AJAX submit, and an email fallback if sending fails.

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const MISSING: Record<string, string> = {
  name: 'Please enter your name.',
  email: 'Please enter your email address.',
  service: 'Please choose what you need help with.',
  message: 'Please tell me a little about your project.',
};

function errorMessage(field: Field): string {
  const { validity } = field;
  if (validity.valid) return '';
  if (validity.valueMissing) return MISSING[field.name] ?? 'This field is required.';
  if (validity.typeMismatch) return 'Please enter a valid email address, like name@example.com.';
  if (validity.tooShort && field instanceof HTMLTextAreaElement) {
    return `Please add a bit more detail (at least ${field.minLength} characters).`;
  }
  if (validity.tooLong) return 'This is a little too long. Please shorten it.';
  return 'Please check this field.';
}

export function initContactForm(form: HTMLFormElement) {
  const success = document.querySelector<HTMLElement>('[data-form-success]');
  const status = document.querySelector<HTMLElement>('[data-form-status]');
  const errorBox = form.querySelector<HTMLElement>('[data-form-error]');
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
  const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
  const email = form.dataset.email ?? '';
  const fields = Array.from(form.querySelectorAll<Field>('input:not([type="hidden"]):not([name="botcheck"]), select, textarea'));
  let attempted = false;

  form.noValidate = true;

  // Preselect the service when arriving from a "Discuss your project" link, e.g. /contact/?service=web-apps
  const wanted = new URLSearchParams(window.location.search).get('service');
  const serviceSelect = form.querySelector<HTMLSelectElement>('select[name="service"]');
  if (wanted && serviceSelect) {
    const option = Array.from(serviceSelect.options).find((o) => o.dataset.id === wanted);
    if (option) serviceSelect.value = option.value;
  }

  const validate = (field: Field): boolean => {
    const message = errorMessage(field);
    const errorEl = document.getElementById(`${field.id}-error`);
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
    if (errorEl) errorEl.textContent = message;
    return !message;
  };

  for (const field of fields) {
    const revalidate = () => {
      if (attempted) validate(field);
    };
    field.addEventListener('input', revalidate);
    field.addEventListener('change', revalidate);
  }

  const setBusy = (busy: boolean) => {
    form.setAttribute('aria-busy', String(busy));
    if (submit) submit.disabled = busy;
    if (submitLabel) submitLabel.textContent = busy ? 'Sending…' : 'Send message';
  };

  const showSuccess = () => {
    form.hidden = true;
    if (success) {
      success.hidden = false;
      success.focus();
    }
    if (status) status.textContent = 'Message sent. Thank you!';
  };

  const hideError = () => {
    if (!errorBox) return;
    errorBox.hidden = true;
    errorBox.replaceChildren();
  };

  const showError = (message: string, payload: Record<string, string>) => {
    if (!errorBox) return;
    const body = [
      `Name: ${payload.name ?? ''}`,
      `Company: ${payload.company || '-'}`,
      `Need: ${payload.service || '-'}`,
      `Budget: ${payload.budget || '-'}`,
      `Timeline: ${payload.timeline || '-'}`,
      '',
      payload.message ?? '',
    ].join('\n');
    const link = document.createElement('a');
    link.className = 'text-link';
    link.href = `mailto:${email}?subject=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent(body)}`;
    link.textContent = 'send it by email instead';

    const text = document.createElement('p');
    text.append(`${message} Your message is still here, so you can try again or `, link, '.');
    errorBox.replaceChildren(text);
    errorBox.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    attempted = true;
    hideError();

    const invalid = fields.filter((field) => !validate(field));
    if (invalid.length > 0) {
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    // Spam bots tick the hidden checkbox; pretend it worked and send nothing.
    if (data.get('botcheck')) {
      showSuccess();
      return;
    }

    const payload: Record<string, string> = {};
    data.forEach((value, key) => {
      if (typeof value === 'string' && key !== 'redirect') payload[key] = value.trim();
    });
    payload.subject = `New inquiry: ${payload.service || 'Project'} from ${payload.name}`;

    setBusy(true);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (response.ok && result.success) {
        form.reset();
        showSuccess();
      } else if (response.status === 429) {
        showError('Too many messages have been sent from this connection. Please wait a few minutes.', payload);
      } else {
        showError(result.message ? `Sending failed: ${result.message}.` : 'Something went wrong while sending.', payload);
      }
    } catch (error) {
      const timedOut = error instanceof DOMException && (error.name === 'TimeoutError' || error.name === 'AbortError');
      const reason = !navigator.onLine
        ? 'You appear to be offline.'
        : timedOut
          ? 'The request timed out.'
          : 'The message could not be sent because of a network problem.';
      showError(reason, payload);
    } finally {
      setBusy(false);
    }
  });
}
