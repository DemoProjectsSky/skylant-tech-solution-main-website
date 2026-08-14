import { motion } from 'framer-motion';
import { useParams, Navigate } from 'react-router-dom';
import {
  Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp,
  Target, Clock, ShieldCheck, MessageSquare, Lock,
  Layers, Award, Sparkles, Cpu, GitBranch, Image as ImageIcon,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';
import CTASection from '../components/CTASection';
import ServiceIllustration from '../components/ServiceIllustration';
import TechLogo from '../components/techlogo';
import services from '../data/services.json';
import faqs from '../data/faqs.json';
import FAQAccordion from '../components/FAQAccordion';

const iconMap: Record<string, any> = { Code2, Globe, Smartphone, Brain, Cloud, Zap, Palette, TrendingUp, Layers };

// Rotates through a set of icons so every feature card doesn't look identical
const featureIcons = [Sparkles, Layers, ShieldCheck, Cpu, GitBranch, Target, Zap, Award];

// Reassurances clients look for before signing off on a project
const assurances = [
  { icon: Clock, label: 'On-Time Delivery' },
  { icon: ShieldCheck, label: 'Transparent Pricing' },
  { icon: MessageSquare, label: 'Dedicated Support' },
  { icon: Lock, label: 'NDA & IP Protection' },
];

// Brand-accurate colors for common tools so TechLogo renders correctly even without a matching entry in technologies.json
const TECH_COLORS: Record<string, string> = {
  'React': '#61DAFB', 'React Native': '#61DAFB', 'Node.js': '#3C873A', 'Python': '#3776AB',
  'Java': '#EA2D2E', 'PostgreSQL': '#336791', 'AWS': '#FF9900', 'Azure': '#0078D4',
  'Google Cloud': '#4285F4', 'VMware': '#607078', 'Cisco': '#1BA0D7', 'Palo Alto Networks': '#FA582D',
  'Next.js': '#000000', 'TypeScript': '#3178C6', 'Tailwind CSS': '#06B6D4', 'WordPress': '#21759B',
  'Webflow': '#4353FF', 'Flutter': '#02569B', 'Swift': '#FA7343', 'Kotlin': '#7F52FF',
  'Firebase': '#FFCA28', 'Redux': '#764ABC', 'TensorFlow': '#FF6F00', 'PyTorch': '#EE4C2C',
  'OpenAI API': '#412991', 'LangChain': '#1C3C3C', 'Hugging Face': '#FFD21E', 'Kubernetes': '#326CE5',
  'Terraform': '#7B42BC', 'Docker': '#2496ED', 'Selenium': '#43B02A', 'Zapier': '#FF4A00',
  'n8n': '#EA4B71', 'Apache Kafka': '#231F20', 'Celery': '#37814A', 'Figma': '#F24E1E',
  'Adobe XD': '#FF61F6', 'Sketch': '#F7B500', 'InVision': '#FF3366', 'Zeplin': '#FDBD39',
  'Storybook': '#FF4785', 'Google Analytics': '#E37400', 'SEMrush': '#FF642D', 'HubSpot': '#FF7A59',
  'Mailchimp': '#FFE01B', 'Meta Ads': '#0866FF', 'Google Ads': '#4285F4',
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = iconMap[service.icon] || Code2;

  return (
    <>
      <PageBanner
        title={service.title}
        description={service.longDescription}
        breadcrumb={[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: service.shortTitle }]}
        illustration={<ServiceIllustration service={service} Icon={Icon} />}
        accentColor={service.color}
        stats={[{ value: '10+', label: 'Projects' }, { value: '10+', label: 'Clients' }, { value: '8+', label: 'Years' }]}
        primaryCta={{ label: 'Get Free Quote', path: '/contact' }}
        secondaryCta={{ label: 'Talk to an Expert', path: '/contact' }}
      />

      {/* OVERVIEW + FEATURES */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Target className="w-4 h-4" /> Overview
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-5 text-balance">{service.title} built for impact</h2>
            <p className="text-[#5B5580] leading-relaxed mb-6">{service.longDescription}</p>
            <p className="text-[#5B5580] leading-relaxed mb-8">{service.domainInsight}</p>

            {/* Client Assurance strip */}
            <div className="grid grid-cols-2 gap-3">
              {assurances.map((a, i) => (
                <motion.div
                  key={a.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-2.5 rounded-xl border border-[#E4DBFF] bg-white/70 backdrop-blur-sm px-3.5 py-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${service.color}18`, color: service.color }}
                  >
                    <a.icon className="w-4 h-4" />
                  </div>
                  <span className="text-[#2C2A4A] text-xs font-semibold leading-tight">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-[#2C2A4A] font-bold text-xl mb-5">Key Features</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((f, i) => {
                const FeatureIcon = featureIcons[i % featureIcons.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    whileHover={{ y: -3 }}
                    className="relative rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm p-5 hover:shadow-md transition-all overflow-hidden group"
                  >
                    <span className="absolute top-3 right-4 text-3xl font-bold text-[#E4DBFF] group-hover:text-[#DDD0FF] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}35` }}
                    >
                      <FeatureIcon className="w-5 h-5" />
                    </div>
                    <span className="text-[#2C2A4A] text-sm font-semibold leading-snug block">{f}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* OFFERINGS — sub-services grid, image on left is a placeholder until real icons are added */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">
              {service.offeringsTitle ?? `Which Types Of ${service.shortTitle} We Provide?`}
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {(service.offerings ?? []).map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className="flex items-start gap-5 rounded-2xl border backdrop-blur-sm p-6 hover:shadow-md transition-all"
                style={{ background: `${service.color}0A`, borderColor: `${service.color}30` }}
              >
                <div
                  className="w-20 h-20 rounded-xl flex items-center justify-center shrink-0 overflow-hidden"
                  style={{ background: `${service.color}12`, border: `1px solid ${service.color}30` }}
                >
                  {o.image ? (
                    <img src={o.image} alt={o.title} className="w-full h-full object-contain p-2" />
                  ) : (
                    <ImageIcon className="w-7 h-7" style={{ color: service.color }} />
                  )}
                </div>
                <div>
                  <h3 className="text-[#2C2A4A] font-bold text-lg mb-2">{o.title}</h3>
                  <p className="text-[#5B5580] text-sm leading-relaxed">{o.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES — now with tool logos */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E4DBFF] bg-white/80 backdrop-blur-sm text-[#6D5BD0] text-sm font-medium mb-5">
              <Cpu className="w-4 h-4" /> Technologies
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">Tools we use</h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {(service.technologies ?? []).map((t, i) => {
              const color = TECH_COLORS[t] || service.color;
              return (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="rounded-2xl border border-[#E4DBFF] bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md p-5 flex flex-col items-center text-center transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${color}15`, border: `1px solid ${color}40` }}
                  >
                    <TechLogo name={t} color={color} size={26} />
                  </div>
                  <div className="text-[#2C2A4A] text-sm font-semibold">{t}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20 sm:py-24 bg-[#EDE9FE]/40 backdrop-blur-sm overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C2A4A] mb-4 text-balance">Frequently asked questions</h2>
          </motion.div>
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <CTASection title={`Ready to start your ${service.shortTitle.toLowerCase()} project?`} description="Let's discuss your requirements and build a solution that drives real business results. Book a free consultation today." primaryLabel="Get Free Quote" secondaryLabel="View All Services" secondaryPath="/services" />
    </>
  );
}