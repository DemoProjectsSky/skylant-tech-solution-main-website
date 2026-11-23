import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3.5">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? 'border-[#8B7FE0]/40 bg-gradient-to-r from-white via-[#F3EFFA] to-white shadow-sm'
                : 'border-[#E6E1F5] bg-white'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span
                className={`text-base font-semibold transition-colors duration-300 lg:text-lg ${
                  isOpen ? 'text-[#2563EB]' : 'text-[#1E293B]'
                }`}
              >
                {item.question}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0, backgroundColor: isOpen ? '#2563EB' : '#F1F5F9' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              >
                <ChevronDown className={`h-4 w-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-slate-500'}`} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <motion.p
                    initial={{ y: -6 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 }}
                    className="px-5 pb-5 leading-relaxed text-slate-500"
                  >
                    {item.answer}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}