import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Code2,
  Brain,
  Palette,
  Cloud,
  Smartphone,
  TrendingUp,
  Globe,
  MapPin,
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  User,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  Upload,
  X,
  File as FileIcon,
} from 'lucide-react';

import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import CareersIllustration from '../components/CareersIllustration';
import jobs from '../data/jobs.json';

// FIXED: actual file is emailjs.ts
import { sendEmail } from '../lib/email';

const iconMap: Record<string, any> = {
  Code2,
  Brain,
  Palette,
  Cloud,
  Smartphone,
  TrendingUp,
  Globe,
};

const jobColors = [
  '#2563EB',
  '#EC4899',
  '#9B8AFB',
  '#F59E0B',
  '#10B981',
  '#06B6D4',
  '#F43F5E',
];

const benefits = [
  {
    title: 'Competitive Compensation',
    description:
      'Salary packages that match or exceed industry standards.',
    color: '#2563EB',
  },
  {
    title: 'Remote-First Culture',
    description:
      'Work from anywhere with flexible hours and async collaboration.',
    color: '#06B6D4',
  },
  {
    title: 'Learning Budget',
    description:
      'Annual budget for courses, conferences, and certifications.',
    color: '#9B8AFB',
  },
  {
    title: 'Health & Wellness',
    description:
      'Comprehensive health insurance and wellness programs.',
    color: '#F43F5E',
  },
  {
    title: 'Growth Opportunities',
    description:
      'Clear career progression paths and mentorship programs.',
    color: '#F59E0B',
  },
  {
    title: 'Modern Tech Stack',
    description:
      'Work with the latest technologies and tools in the industry.',
    color: '#10B981',
  },
];

const hiringProcess = [
  {
    step: '01',
    title: 'Application',
    description:
      'Submit your application with resume and portfolio.',
    color: '#2563EB',
  },
  {
    step: '02',
    title: 'Screening',
    description:
      'Initial call with our HR team to understand your background.',
    color: '#EC4899',
  },
  {
    step: '03',
    title: 'Technical Interview',
    description:
      'Deep-dive technical discussion with senior engineers.',
    color: '#9B8AFB',
  },
  {
    step: '04',
    title: 'Final & Offer',
    description:
      "Meet the team and receive your offer if it's a fit.",
    color: '#10B981',
  },
];

const MAX_RESUME_SIZE_MB = 5;
const ACCEPTED_RESUME_TYPES = '.pdf,.doc,.docx';

export default function Careers() {
  const formRef = useRef<HTMLFormElement>(null);

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: jobs[0]?.title || '',
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

  const handleResumeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    setResumeError('');

    if (!file) {
      setResumeFile(null);
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !allowedExtensions.includes(ext)) {
      setResumeError(
        'Please upload a PDF, DOC, or DOCX file.'
      );

      e.target.value = '';
      setResumeFile(null);
      return;
    }

    if (file.size > MAX_RESUME_SIZE_MB * 1024 * 1024) {
      setResumeError(
        `File is too large. Max size is ${MAX_RESUME_SIZE_MB}MB.`
      );

      e.target.value = '';
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
    setResumeError('');

    const input = document.getElementById(
      'resume-upload'
    ) as HTMLInputElement | null;

    if (input) {
      input.value = '';
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsSending(true);
    setErrorMessage('');

    try {
      if (!formRef.current) {
        throw new Error(
          'Application form is not available.'
        );
      }

      if (!resumeFile) {
        setResumeError(
          'Please upload your resume before submitting.'
        );
        setIsSending(false);
        return;
      }

      // Send career application
      await sendEmail('career', formRef.current);

      setFormData({
        name: '',
        email: '',
        phone: '',
        role: jobs[0]?.title || '',
        message: '',
      });

      handleRemoveResume();

      setErrorMessage('');

      window.alert(
        'Application submitted successfully. We will contact you shortly.'
      );
    } catch (error) {
      console.error(
        'Career application error:',
        error
      );

      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to submit your application. Please try again.'
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
            Build your{' '}
            <span style={{ color: '#2F6EFF' }}>
              career at Skylant
            </span>
          </>
        }
        description="Join a team of passionate engineers, designers, and innovators building world-class software for businesses across the globe."
        breadcrumb={[
          { name: 'Home', path: '/' },
          { name: 'Careers' },
        ]}
        illustration={<CareersIllustration />}
        primaryCta={{
          label: 'View Open Positions',
          path: '/careers',
        }}
        secondaryCta={{
          label: 'Contact Us',
          path: '/contact',
        }}
      />

      {/* OPEN POSITIONS */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Briefcase className="w-4 h-4" />
              Open Positions
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Find your next role
            </h2>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, i) => {
              const Icon = iconMap[job.icon] || Code2;
              const color =
                jobColors[i % jobColors.length];

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                  }}
                  className="group relative rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                  style={{
                    borderColor: `${color}40`,
                    background: `linear-gradient(160deg, ${color}12 0%, rgba(255,255,255,0.85) 55%)`,
                  }}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-35"
                    style={{ background: color }}
                  />

                  <div className="relative z-10 w-full flex flex-col gap-4 p-5 text-left sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0"
                        style={{
                          background: `${color}18`,
                          borderColor: `${color}40`,
                          color,
                        }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        <h3 className="text-[#2C2A4A] font-bold text-lg">
                          {job.title}
                        </h3>

                        <span
                          className="mt-1 inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
                          style={{
                            background: `${color}18`,
                            color,
                          }}
                        >
                          {job.department}
                        </span>

                        <div className="mt-3 flex flex-col gap-1.5 text-xs text-[#5B5580]">
                          <span className="flex items-center gap-2">
                            <MapPin
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color }}
                            />
                            {job.location}
                          </span>

                          <span className="flex items-center gap-2">
                            <Clock
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color }}
                            />
                            {job.type}
                          </span>

                          <span className="flex items-center gap-2">
                            <User
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color }}
                            />
                            {job.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 self-start sm:self-center">
                      <span
                        className="hidden sm:inline-flex px-3 py-1 rounded-full border text-xs font-medium"
                        style={{
                          background: `${color}18`,
                          borderColor: `${color}40`,
                          color,
                        }}
                      >
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <div
                    className="relative z-10 px-5 pb-5 pt-2 border-t"
                    style={{
                      borderColor: `${color}30`,
                    }}
                  >
                    <p className="text-[#5B5580] text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {job.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-full text-xs"
                          style={{
                            background: `${color}14`,
                            color,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <a
                      href="#apply"
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                      style={{ background: color }}
                    >
                      Apply for this role
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Why join Skylant?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-sm transition-all hover:shadow-sm"
                style={{
                  borderColor: `${b.color}40`,
                  background: `linear-gradient(160deg, ${b.color}12 0%, rgba(255,255,255,0.6) 55%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: b.color }}
                />

                <div
                  className="relative z-10 w-10 h-10 rounded-xl border flex items-center justify-center mb-4"
                  style={{
                    background: `${b.color}18`,
                    borderColor: `${b.color}40`,
                    color: b.color,
                  }}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>

                <h3 className="relative z-10 text-[#2C2A4A] font-bold text-lg mb-2">
                  {b.title}
                </h3>

                <p className="relative z-10 text-[#5B5580] text-sm leading-relaxed">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Our hiring process
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hiringProcess.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border shadow-sm p-6 backdrop-blur-sm transition-all hover:shadow-md"
                style={{
                  borderColor: `${step.color}40`,
                  background: `linear-gradient(160deg, ${step.color}12 0%, rgba(255,255,255,0.85) 55%)`,
                }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-35"
                  style={{ background: step.color }}
                />

                <div className="relative z-10 flex items-center justify-between mb-5">
                  <span
                    className="text-4xl font-bold"
                    style={{
                      color: `${step.color}55`,
                    }}
                  >
                    {step.step}
                  </span>
                </div>

                <h3 className="relative z-10 text-[#2C2A4A] font-bold text-lg mb-2">
                  {step.title}
                </h3>

                <p className="relative z-10 text-[#5B5580] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION FORM */}
      <section
        id="apply"
        className="relative py-20 sm:py-24 overflow-hidden"
      >
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">
              Apply now
            </h2>

            <p className="text-[#5B5580]">
              Fill out the form below and we'll get back to you within 48 hours.
            </p>
          </motion.div>

          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="rounded-3xl border border-[#E4DBFF] bg-white/90 backdrop-blur-sm shadow-sm p-6 lg:p-8 space-y-5"
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
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-sm text-[#2C2A4A] mb-2">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8783A6]" />

                <input
                  required
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm text-[#2C2A4A] mb-2">
                Role you're applying for
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm focus:outline-none focus:border-[#6D5BD0]/50"
              >
                {jobs.map((j) => (
                  <option key={j.id} value={j.title}>
                    {j.title}
                  </option>
                ))}
              </select>
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm text-[#2C2A4A] mb-2">
                Cover Letter / Message
              </label>

              <div className="relative">
                <FileText className="absolute left-3 top-3 w-4 h-4 text-[#8783A6]" />

                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E4DBFF] bg-white text-[#2C2A4A] text-sm placeholder:text-[#8783A6] focus:outline-none focus:border-[#6D5BD0]/50 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* RESUME UPLOAD */}
            <div>
              <label className="block text-sm text-[#2C2A4A] mb-2">
                Upload Resume
              </label>

              {/*
                IMPORTANT FIX:
                The <input type="file"> below is now ALWAYS mounted,
                outside the `resumeFile ? ... : ...` branch. Previously it
                lived only inside the "no file selected" branch, so as soon
                as a file was picked the input (and its FileList) got
                unmounted by React — meaning `new FormData(formRef.current)`
                inside sendEmail() no longer contained the file, and the
                backend received req.file === undefined.
              */}
              <input
                id="resume-upload"
                name="resume"
                type="file"
                accept={ACCEPTED_RESUME_TYPES}
                onChange={handleResumeChange}
                className="hidden"
              />

              {!resumeFile ? (
                <label
                  htmlFor="resume-upload"
                  className="flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed border-[#E4DBFF] bg-[#F8F7FF] px-4 py-8 text-center cursor-pointer transition-colors hover:border-[#6D5BD0]/60 hover:bg-[#F3F0FF]"
                >
                  <Upload className="w-6 h-6 text-[#6D5BD0]" />

                  <span className="text-sm font-medium text-[#2C2A4A]">
                    Click to upload your resume
                  </span>

                  <span className="text-xs text-[#8783A6]">
                    PDF, DOC, or DOCX — max {MAX_RESUME_SIZE_MB}MB
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between gap-3 rounded-xl border border-[#E4DBFF] bg-white px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#6D5BD0]/10 text-[#6D5BD0] flex items-center justify-center shrink-0">
                      <FileIcon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#2C2A4A] truncate">
                        {resumeFile.name}
                      </p>

                      <p className="text-xs text-[#8783A6]">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#8783A6] hover:bg-red-50 hover:text-red-500 transition-colors"
                    aria-label="Remove resume"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {resumeError ? (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {resumeError}
                </p>
              ) : null}
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
                ? 'Submitting...'
                : 'Submit Application'}

              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </section>

      <CTASection />
    </>
  );
}