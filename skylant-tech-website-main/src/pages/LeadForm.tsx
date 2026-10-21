import { useEffect, useState } from 'react';

type LeadFormProps = {
  onClose: () => void;
};

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  college: string;
  year: string;
  program: string;
};

export default function LeadForm({ onClose }: LeadFormProps) {
  const [showClose, setShowClose] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);
  // CHANGED: hidden anti-spam field. Real users never see or fill it.
  const [honeypot, setHoneypot] = useState('');

  const [form, setForm] = useState<LeadFormData>({
    name: '',
    phone: '',
    email: '',
    college: '',
    year: '',
    program: '',
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowClose(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (submitMessage) {
      setSubmitMessage('');
      setSubmitError(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError(false);

    try {
      // CHANGED: never fall back to localhost in a production build.
      const configuredUrl = import.meta.env.VITE_API_URL as string | undefined;
      if (!configuredUrl && import.meta.env.PROD) {
        throw new Error(
          'The form is temporarily unavailable. Please try again later.'
        );
      }
      const apiUrl = (configuredUrl || 'http://localhost:5000').replace(
        /\/+$/,
        ''
      );

      // CHANGED: public intake endpoint (no login required).
      // source / status / assignment are decided by the server, not the browser.
      const response = await fetch(`${apiUrl}/api/public/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          college: form.college.trim(),
          year: form.year,
          program: form.program,
          website: honeypot,
        }),
      });

      const result = await response.json().catch(() => null);

      // CHANGED: success is shown only if the backend confirms it saved the lead.
      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            result?.error ||
            `Submission failed (${response.status}). Please try again.`
        );
      }

      setSubmitError(false);
      setSubmitMessage(
        'Thank you! Your information has been submitted successfully.'
      );

      setForm({
        name: '',
        phone: '',
        email: '',
        college: '',
        year: '',
        program: '',
      });
    } catch (error) {
      console.error('Lead submission error:', error);

      // Form values are intentionally NOT cleared here, so the user can retry.
      setSubmitError(true);
      setSubmitMessage(
        error instanceof TypeError
          ? 'Network error. Please check your connection and try again.'
          : error instanceof Error
            ? error.message
            : 'Unable to submit your information. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

  return (
    <section className="relative w-full">
      <form
        onSubmit={handleSubmit}
        className="relative w-full space-y-4 rounded-2xl border border-blue-200 bg-white p-6 pt-12 shadow-2xl sm:p-8 sm:pt-12"
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close lead form"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-3xl leading-none text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            ×
          </button>
        )}

        <h1 className="pr-4 text-2xl font-bold text-gray-900 sm:text-3xl">
          Your Future Starts with Skylant
        </h1>

        <p className="text-sm leading-6 text-gray-600 sm:text-base">
          Tell us a little about yourself, and let’s help you discover the
          right path to build your skills and career.
        </p>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
          required
          maxLength={100}
          className={inputClass}
        />

        <input
          name="phone"
          type="tel"
          placeholder="10-digit Mobile Number"
          value={form.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="numeric"
          required
          pattern="[6-9][0-9]{9}"
          maxLength={10}
          title="Please enter a valid 10-digit mobile number"
          className={inputClass}
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
          maxLength={254}
          className={inputClass}
        />

        <input
          name="college"
          type="text"
          placeholder="College Name"
          value={form.college}
          onChange={handleChange}
          required
          maxLength={150}
          className={inputClass}
        />

        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Select Year of Study</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
          <option value="Graduate">Graduate</option>
        </select>

        <select
          name="program"
          value={form.program}
          onChange={handleChange}
          required
          className={inputClass}
        >
          <option value="">Interested Program</option>
          <option value="Full Stack Development">
            Full Stack Development
          </option>
          <option value="Data Science & AI">
            Data Science &amp; AI
          </option>
          <option value="Web Development Internship">
            Web Development Internship
          </option>
          <option value="Other">Other</option>
        </select>

        {/* CHANGED: honeypot field, invisible to humans and screen readers */}
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}
        >
          <label>
            Leave this field empty
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Information'}
        </button>

        {submitMessage && (
          <p
            role="status"
            aria-live="polite"
            className={`text-center text-sm ${
              submitError ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {submitMessage}
          </p>
        )}

        <p className="text-center text-xs text-gray-500">
          Your information will help our team connect with you about relevant
          programs.
        </p>
      </form>
    </section>
  );
}