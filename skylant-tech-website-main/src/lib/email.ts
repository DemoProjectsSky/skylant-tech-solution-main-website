export async function sendEmail(
  type: 'contact' | 'career',
  data: HTMLFormElement | Record<string, string>
) {
  const formData = new FormData();
  formData.append('type', type);

  if (data instanceof HTMLFormElement) {
    const raw = new FormData(data);
    raw.forEach((value, key) => {
      formData.append(key, value);
    });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  const res = await fetch('/api/send-email', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Unable to send your message. Please try again.');
  }

  return res.json();
}