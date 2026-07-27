import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, User, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'hello@skylanttech.com', sub: 'We reply within 24 hours' },
  { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', sub: 'Mon-Fri, 9am-6pm' },
  { icon: MapPin, label: 'Visit Us', value: '123 Innovation Drive, Tech Park, Suite 400', sub: 'San Francisco, CA 94105' },
  { icon: Clock, label: 'Working Hours', value: 'Monday - Friday', sub: '9:00 AM - 6:00 PM PST' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageBanner
        title="Let's build something great together"
        description="Tell us about your project and our team will get back to you within 24 hours with a personalized proposal and next steps."
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Contact' }]}
        image="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=900&h=1000&dpr=2"
        floatingCards={[
          { icon: <Mail className="w-4 h-4" />, title: '24hr Response' },
          { icon: <CheckCircle2 className="w-4 h-4" />, title: 'Free Consultation' },
          { icon: <Phone className="w-4 h-4" />, title: 'Expert Team' },
        ]}
        stats={[{ value: '24hr', label: 'Response' }, { value: '100+', label: 'Clients' }, { value: '250+', label: 'Projects' }]}
        primaryCta={{ label: 'Book Consultation', path: '/contact' }}
        secondaryCta={{ label: 'View Services', path: '/services' }}
      />

      {/* CONTACT FORM + INFO */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-sky-400 text-sm font-medium mb-5"><MessageSquare className="w-4 h-4" /> Get in Touch</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 text-balance">Ready to start your project?</h2>
            <p className="text-slate-400 leading-relaxed mb-8">Whether you have a clear vision or just an idea, we're here to help. Reach out through any channel below and let's discuss how we can bring your project to life.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass-card rounded-2xl p-5 hover:border-sky-400/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-3"><c.icon className="w-5 h-5" /></div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider mb-1">{c.label}</div>
                  <div className="text-white font-semibold text-sm mb-0.5">{c.value}</div>
                  <div className="text-slate-500 text-xs">{c.sub}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card-strong rounded-3xl p-6 lg:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-5"><CheckCircle2 className="w-8 h-8" /></div>
                <h3 className="text-2xl font-bold text-white mb-3">Message sent!</h3>
                <p className="text-slate-400 mb-6">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary">Send another message</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Full Name</label>
                    <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="John Doe" /></div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Email</label>
                    <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input required type="email" className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="john@company.com" /></div>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Company</label>
                    <input className="w-full px-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="Company name" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Phone</label>
                    <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" /><input className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40" placeholder="+1 (555) 000-0000" /></div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Service of Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl glass-card text-white text-sm focus:outline-none focus:border-sky-400/40">
                    <option className="bg-slate-900">Custom Software Development</option>
                    <option className="bg-slate-900">Website Development</option>
                    <option className="bg-slate-900">Mobile App Development</option>
                    <option className="bg-slate-900">AI Solutions</option>
                    <option className="bg-slate-900">Cloud Solutions</option>
                    <option className="bg-slate-900">Automation Services</option>
                    <option className="bg-slate-900">UI/UX Design</option>
                    <option className="bg-slate-900">Digital Marketing</option>
                    <option className="bg-slate-900">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">Project Details</label>
                  <div className="relative"><MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><textarea required rows={4} className="w-full pl-10 pr-4 py-3 rounded-xl glass-card text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-sky-400/40 resize-none" placeholder="Tell us about your project, goals, and timeline..." /></div>
                </div>
                <button type="submit" className="btn-primary w-full">Send Message <Send className="w-4 h-4" /></button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      {/* <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card rounded-3xl overflow-hidden">
            <div className="relative aspect-[16/7] bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 flex items-center justify-center">
              <div className="absolute inset-0 grid-pattern opacity-40" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mx-auto mb-4 animate-pulse-glow"><MapPin className="w-8 h-8" /></div>
                <h3 className="text-white font-bold text-xl mb-2">Skylant Tech Solutions HQ</h3>
                <p className="text-slate-400 text-sm">123 Innovation Drive, Tech Park, Suite 400, San Francisco, CA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* MAP SECTION */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl overflow-hidden"
          >
            <div className="relative h-[500px] w-full">

              {/* Google Map */}
              <iframe
                title="Skylant Tech Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4413.157666797166!2d79.04415552569428!3d21.17536044817894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1df5709dabd%3A0x298cde53dd17a5c5!2sMicronet%20Solutions!5e1!3m2!1sen!2sin!4v1784374563597!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />


            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">Quick answers</h2>
          </motion.div>
          <FAQAccordion items={faqs.slice(0, 6)} />
        </div>
      </section>

      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-blue-950/30" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-card-strong rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 text-balance">Prefer to talk directly?</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">Schedule a free 30-minute consultation with our experts. No commitments, just a conversation about how we can help.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="tel:+15551234567" className="btn-primary"><Phone className="w-4 h-4" /> Schedule a Call</a>
              <a href="mailto:hello@skylanttech.com" className="btn-secondary"><Mail className="w-4 h-4" /> Email Us</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
