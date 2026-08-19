import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  User,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import PageBanner from '../components/PageBanner';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';
import ContactIllustration from '../components/ContactIllustration';

// FIXED: actual file is emailjs.ts
import { sendEmail } from '../lib/email';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'hr.skylant@gmail.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91- 75585 31369',
    sub: 'Mon-Fri, 9am-6pm',
  },
  {
    icon: MapPin,
    label: 'Visit Us',
    value:
      'First Floor, 101, Sivalik Apartment, Lumbini Nagar, near Vasudeo nagar metro station, Higana Road, Nagpur-440036',
    sub: 'Nagpur, Maharashtra',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Monday - Friday',
    sub: '9:00 AM - 6:00 PM PST',
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: 'Custom Software Development',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSending(true);
    setErrorMessage('');

    try {
      await sendEmail('contact', {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      });

      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: 'Custom Software Development',
        message: '',
      });
    } catch (error) {
      console.error('Contact form error:', error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again.'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <PageBanner
        title={
          <>
            Let's build something{' '}
            <span style={{ color: '#2F6EFF' }}>
              great together
            </span>
          </>
        }
        description="Tell us about your project and our team will get back to you within 24 hours with a personalized proposal and next steps."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Contact' },
        ]}
        illustration={<ContactIllustration />}
        primaryCta={{
          label: 'Book Consultation',
          path: '/contact',
        }}
        secondaryCta={{
          label: 'View Services',
          path: '/services',
        }}
      />

      {/* CONTACT FORM + INFO */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <MessageSquare className="w-4 h-4" />
              Get in Touch
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-5 text-balance">
              Ready to start your project?
            </h2>

            <p className="text-[#5B5580] leading-relaxed mb-8">
              Whether you have a clear vision or just an idea,
              we're here to help. Reach out through any channel
              below and let's discuss how we can bring your
              project to life.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((c, i) => {
                const Icon = c.icon;

                return (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                    }}
                    className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md p-5 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#F3F0FF] border border-[#E4DBFF] flex items-center justify-center text-[#6D5BD0] mb-3">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-[#8783A6] text-xs uppercase tracking-wider mb-1">
                      {c.label}
                    </div>

                    <div className="text-[#2C2A4A] font-semibold text-sm mb-0.5">
                      {c.value}
                    </div>

                    <div className="text-[#8783A6] text-xs">
                      {c.sub}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm p-6 lg:p-8"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 mb-5">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-[#2C2A4A] mb-3">
                  Message sent!
                </h3>

                <p className="text-[#5B5580] mb-6">
                  Thank you for reaching out. Our team will get
                  back to you within 24 hours.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setErrorMessage('');
                  }}
                  className="rounded-xl border border-[#E4DBFF] bg-white/70 px-6 py-3 font-medium text-[#2C2A4A] backdrop-blur-sm transition-colors hover:bg-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* NAME + EMAIL */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#2C2A4A] mb-2">
                      Full Name
                    </label>

                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />

                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#2C2A4A] mb-2">
                      Email
                    </label>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />

                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                </div>

                {/* COMPANY + PHONE */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#2C2A4A] mb-2">
                      Company
                    </label>

                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#2C2A4A] mb-2">
                      Phone
                    </label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />

                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>

                {/* SERVICE */}
                <div>
                  <label className="block text-sm text-[#2C2A4A] mb-2">
                    Service of Interest
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm focus:outline-none focus:border-[#6D5BD0]/50"
                  >
                    <option>
                      Custom Software Development
                    </option>
                    <option>
                      Website Development
                    </option>
                    <option>
                      ERP & CRM Solutions
                    </option>
                    <option>
                      Mobile App Development
                    </option>
                    <option>
                      AI Solutions
                    </option>
                    <option>
                      Cloud Solutions
                    </option>
                    <option>
                      Automation Services
                    </option>
                    <option>
                      UI/UX Design
                    </option>
                    <option>Other</option>
                  </select>
                </div>

                {/* MESSAGE */}
                <div>
                  <label className="block text-sm text-[#2C2A4A] mb-2">
                    Project Details
                  </label>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#8783A6]" />

                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50 resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>
                </div>

                {/* ERROR */}
                {errorMessage ? (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>{errorMessage}</span>
                  </div>
                ) : null}

                {/* SUBMIT */}
                <button
                  disabled={isSending}
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#6D5BD0] px-6 py-3 font-medium text-white transition-colors hover:bg-[#5b4bb8] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSending
                    ? 'Sending...'
                    : 'Send Message'}

                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden"
          >
            <div className="relative h-[500px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d914.1105231903676!2d79.01729320309553!3d21.117871925281804!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA3JzAyLjgiTiA3OcKwMDEnMDIuOCJF!5e0!3m2!1sen!2sin!4v1785580785728!5m2!1sen!2sin"
                className="w-full h-[450px] rounded-3xl border-0 shadow-xl"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title="Skylant Tech Solutions Location"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Quick answers
            </h2>
          </motion.div>

          <FAQAccordion items={faqs.slice(0, 6)} />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm p-8 lg:p-12 text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Prefer to talk directly?
            </h2>

            <p className="text-[#5B5580] mb-8 max-w-xl mx-auto">
              Schedule a free 30-minute consultation with
              our experts. No commitments, just a conversation
              about how we can help.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+917558531369"
                className="inline-flex items-center gap-2 rounded-xl bg-[#6D5BD0] px-6 py-3 font-medium text-white transition-colors hover:bg-[#5b4bb8]"
              >
                <Phone className="w-4 h-4" />
                Schedule a Call
              </a>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hr.skylant@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E4DBFF] bg-white/70 px-6 py-3 font-medium text-[#2C2A4A] backdrop-blur-sm transition-colors hover:bg-white"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}