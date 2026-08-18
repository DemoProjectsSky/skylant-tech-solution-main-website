import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle2, Clock, Users, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TimelinePhase {
  phase: string;
  duration: string;
  description: string;
}

interface OfferingDetails {
  fullDescription: string;
  idealFor: string;
  keyFeatures: string[];
  timeline: TimelinePhase[];
  totalTimeline: string;
}

interface Offering {
  title: string;
  description: string;
  image?: string;
  details?: OfferingDetails;
}

interface OfferingDetailModalProps {
  offering: Offering | null;
  accentColor: string;
  onClose: () => void;
}

export default function OfferingDetailModal({ offering, accentColor, onClose }: OfferingDetailModalProps) {
  // Lock body scroll while open, close on Escape
  useEffect(() => {
    if (!offering) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [offering, onClose]);

  return (
    <AnimatePresence>
      {offering && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1E1B33]/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-[#E4DBFF] shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start gap-4 p-6 sm:p-8 pb-5 bg-white/95 backdrop-blur-sm border-b border-[#E4DBFF]">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}30` }}
              >
                {offering.image ? (
                  <img src={offering.image} alt={offering.title} className="w-full h-full object-contain p-2" />
                ) : (
                  <ImageIcon className="w-6 h-6" style={{ color: accentColor }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-[#2C2A4A] leading-snug">{offering.title}</h3>
                <p className="text-[#5B5580] text-sm mt-1">{offering.description}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close details"
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-[#5B5580] hover:text-[#2C2A4A] hover:bg-[#F1F5F9] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 pt-6 space-y-8">
              {offering.details ? (
                <>
                  {/* Full description */}
                  <p className="text-[#5B5580] leading-relaxed">{offering.details.fullDescription}</p>

                  {/* Ideal for */}
                  <div
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: `${accentColor}0A`, border: `1px solid ${accentColor}25` }}
                  >
                    <Users className="w-5 h-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                    <div>
                      <div className="text-[#2C2A4A] text-sm font-semibold mb-1">Ideal for</div>
                      <p className="text-[#5B5580] text-sm leading-relaxed">{offering.details.idealFor}</p>
                    </div>
                  </div>

                  {/* Key features */}
                  <div>
                    <h4 className="text-[#2C2A4A] font-bold text-base mb-4">What's included</h4>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                      {offering.details.keyFeatures.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
                          <span className="text-[#4A4568] text-sm leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-[#2C2A4A] font-bold text-base">Typical timeline</h4>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: `${accentColor}15`, color: accentColor }}
                      >
                        <Clock className="w-3.5 h-3.5" /> {offering.details.totalTimeline}
                      </span>
                    </div>
                    <div className="relative pl-8">
                      <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[#E4DBFF]" />
                      <div className="space-y-5">
                        {offering.details.timeline.map((step, i) => (
                          <div key={step.phase} className="relative">
                            <div
                              className="absolute -left-8 top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ background: accentColor }}
                            >
                              {i + 1}
                            </div>
                            <div className="flex flex-wrap items-baseline gap-x-2.5">
                              <span className="text-[#2C2A4A] text-sm font-semibold">{step.phase}</span>
                              <span className="text-xs font-medium" style={{ color: accentColor }}>
                                {step.duration}
                              </span>
                            </div>
                            <p className="text-[#5B5580] text-sm mt-0.5 leading-relaxed">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-[#9691B5] text-xs mt-5">
                      Timelines are typical estimates for this website type and can shift based on scope and content readiness.
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-[#5B5580] leading-relaxed">{offering.description}</p>
              )}

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/contact"
                  className="flex-1 text-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                  style={{ background: accentColor }}
                >
                  Get a Free Quote
                </Link>
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none rounded-xl px-5 py-3 text-sm font-semibold text-[#2C2A4A] border border-[#E4DBFF] hover:bg-[#F8FAFC] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}