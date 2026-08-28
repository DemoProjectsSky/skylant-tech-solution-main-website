import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useState } from 'react';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const GROQ_MODEL = import.meta.env.VITE_GROQ_MODEL || 'llama-3.1-8b-instant';

// 👉 Replace with your real business WhatsApp number (country code, no + / spaces / dashes)
const WHATSAPP_PREFILL = "Hi Skylant Tech Solutions ! I'd like to know more about your services.";

type Message = {
  id: number;
  sender: 'user' | 'ai';
  text: string;
};

const quickPrompts = [
  'Tell me about your services',
  'Need a custom web app?',
  'How do I start a project?',
];

/* -------------------------------------------------------------------------
   KEYWORD-MATCHED KNOWLEDGE BASE
   Each entry has a set of keywords (from all FAQs built so far — General,
   Pricing, Process, Support, Security, Technical, Legal, Digital Marketing,
   Training, and Internship) and a canned answer. Checked top to bottom;
   the first entry whose keywords appear in the user's message wins.
   Falls back to the Groq API only if nothing matches.
------------------------------------------------------------------------- */
type KnowledgeEntry = {
  keywords: string[];
  answer: string;
};

const knowledgeBase: KnowledgeEntry[] = [
  // ---- General / Services ----
  {
    keywords: ['what services', 'services do you offer', 'services you offer', 'what do you do', 'what do you offer'],
    answer:
      'We offer end-to-end web and software development, mobile app development, AI solutions, ERP systems, cloud services, and complete digital marketing services including SEO, social media marketing, paid ads, and branding — all under one roof.',
  },
  {
    keywords: ['small business', 'startup', 'good fit'],
    answer:
      'Yes! We work with startups and small businesses just as much as larger companies. Our solutions are scoped to your budget and goals, so you only pay for what you actually need to grow.',
  },

  // ---- Pricing ----
  {
    keywords: ['price', 'pricing', 'cost', 'budget', 'how much', 'charges', 'fees'],
    answer:
      'Cost depends on the features, complexity, and timeline you need. A basic business website starts lower, while a custom app or platform costs more. We give you a clear, itemized quote after understanding your requirements — no hidden charges.',
  },

  // ---- Process / Timeline ----
  {
    keywords: ['how long', 'timeline', 'duration', 'time will it take', 'time does it take', 'how much time'],
    answer:
      "A simple website usually takes 2-4 weeks, a custom web or mobile app takes 6-12 weeks, and larger platforms can take longer depending on scope. For digital marketing, initial setup takes 1-2 weeks and ongoing results build over 2-3 months.",
  },
  {
    keywords: ['track progress', 'progress', 'updates', 'project management', 'communication process'],
    answer:
      "Yes. We share regular updates, milestone demos, and a clear project timeline so you always know what's happening and what's coming next — no surprises.",
  },

  // ---- Support ----
  {
    keywords: ['support', 'maintenance', 'after launch', 'post launch', 'bug fix'],
    answer:
      'Yes, we offer post-launch support for bug fixes, updates, and maintenance so your website or app keeps running smoothly. Support plans can be monthly or as-needed based on your requirement.',
  },

  // ---- Security ----
  {
    keywords: ['secure', 'security', 'data safe', 'data protection', 'encryption'],
    answer:
      'Yes. We follow standard security practices — secure login systems, encrypted data, and regular checks — so your customer data and business information stay protected.',
  },

  // ---- Technical ----
  {
    keywords: ['existing website', 'redesign', 'revamp', 'upgrade website', 'old website'],
    answer:
      "Absolutely. We can audit your current website, fix performance and design issues, and upgrade it with modern features without starting from scratch, saving you both time and cost.",
  },
  {
    keywords: ['tech stack', 'technology', 'framework', 'programming language'],
    answer:
      "We have experience working with diverse technology stacks and can integrate with your existing systems, whether it's legacy software, modern cloud services, or third-party APIs.",
  },

  // ---- Legal ----
  {
    keywords: ['own the code', 'ownership', 'nda', 'intellectual property', 'ip rights', 'confidential'],
    answer:
      "Yes. Once the project is complete and paid for, full ownership of the code, design, and content belongs entirely to you. We also sign NDAs to keep your business idea confidential.",
  },

  // ---- Digital Marketing ----
  {
    keywords: ['digital marketing', 'difference between website and marketing'],
    answer:
      'A website is your online presence, but digital marketing (SEO, ads, social media) is what actually brings customers to it. We recommend combining both so your investment in a website turns into real leads and sales.',
  },
  {
    keywords: ['seo', 'search engine optimization', 'google ranking', 'rank on google'],
    answer:
      'Paid ads (Google/Facebook) can bring visible traffic and leads within the first 1-2 weeks. SEO is a long-term strategy and typically shows meaningful ranking improvements within 3-6 months of consistent work.',
  },
  {
    keywords: ['social media', 'instagram', 'facebook marketing', 'linkedin marketing'],
    answer:
      "Yes, we handle content planning, post creation, and posting schedules across Instagram, Facebook, and LinkedIn, along with performance tracking so you can see what's actually working.",
  },
  {
    keywords: ['ads', 'ppc', 'paid advertising', 'google ads', 'facebook ads'],
    answer:
      'We run high-intent Google Ads and social media ad campaigns engineered to lower your cost-per-lead and maximize return on ad spend.',
  },

  // ---- Training ----
  {
    keywords: ['training', 'course', 'courses', 'learn coding', 'upskill'],
    answer:
      'We offer professional training courses in web development, AI, cloud, and more — with Beginner, Intermediate, and Advanced tracks. No prior experience is needed for the Beginner track. Check out our Training page for full details!',
  },
  {
    keywords: ['certificate', 'certification'],
    answer:
      'Yes, you receive a completion certificate from Skylant Tech Solutions after finishing a training course or internship, which you can add to your resume and LinkedIn profile.',
  },
  {
    keywords: ['corporate training', 'team training', 'company training'],
    answer:
      "Absolutely. We offer customized corporate training programs to upskill teams in specific technologies or tools — get in touch with your team's goals and we'll tailor a plan.",
  },

  // ---- Internship ----
  {
    keywords: ['internship', 'intern', 'apply for internship'],
    answer:
      'We offer internships across technical and non-technical domains where you work on real client projects with senior mentorship. Check our Internship page to see open roles and apply directly.',
  },
  {
    keywords: ['paid internship', 'stipend', 'unpaid'],
    answer:
      'Compensation for internships depends on the role, duration, and your performance during selection. Exact details are shared during the interview process before you accept an offer.',
  },
  {
    keywords: ['remote internship', 'work from home', 'hybrid'],
    answer:
      'We offer a mix of remote, hybrid, and in-office internships depending on the role and domain. The mode for each opening is discussed during the application process.',
  },
  {
    keywords: ['mentor', 'mentorship', 'guidance'],
    answer:
      'Yes, every intern is paired with a senior engineer or domain expert for 1-on-1 mentorship and regular feedback throughout the internship.',
  },
  {
    keywords: ['full time job', 'ppo', 'job offer', 'placement', 'hire after internship'],
    answer:
      'Yes! Strong-performing interns are considered for full-time roles or extended opportunities with Skylant based on availability and performance during the internship.',
  },
  {
    keywords: ['spots', 'seats', 'how many selected', 'openings'],
    answer:
      'Spot availability varies by role and is shown on each opening. Roles with limited spots are on a first-come, first-selected basis, so applying early helps.',
  },
  {
    keywords: ['eligible', 'eligibility', 'who can apply'],
    answer:
      'Students currently pursuing a degree, or recent graduates, in a relevant technical or non-technical field can apply. No prior professional experience is required — just a strong foundation in the relevant skills and willingness to learn.',
  },

  // ---- Getting started / Contact ----
  {
    keywords: ['get started', 'how do i start', 'start a project', 'begin', 'consultation'],
    answer:
      "Just book a free consultation call. We'll understand your goals, share a clear proposal with cost and timeline, and once you approve, we get your project started right away.",
  },
  {
    keywords: ['contact', 'phone number', 'email', 'reach you', 'whatsapp'],
    answer:
      'You can reach us anytime through our Contact page, or tap the WhatsApp button right next to this chat for a quick reply.',
  },

  // ---- Broader fallback matches (kept last so more specific matches above win) ----
  {
    keywords: ['service', 'services'],
    answer:
      'We build web apps, mobile apps, AI solutions, ERP systems, and cloud platforms tailored to your business goals.',
  },
  {
    keywords: ['app', 'website'],
    answer:
      'Absolutely. We can turn your idea into a polished product with design, development, deployment, and ongoing support.',
  },
];

function matchKnowledgeBase(input: string): string | null {
  const normalized = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((keyword) => normalized.includes(keyword))) {
      return entry.answer;
    }
  }
  return null;
}

async function getAiReply(input: string) {
  const matchedAnswer = matchKnowledgeBase(input);
  if (matchedAnswer) {
    return matchedAnswer;
  }

  if (!GROQ_API_KEY) {
    return 'Groq API key is not configured yet. Please add VITE_GROQ_API_KEY in your environment variables.';
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are Skylant AI, a helpful assistant for Skylant Technologies. Answer briefly, professionally, and in a friendly tone. Focus on software development, websites, mobile apps, AI solutions, cloud, ERP, digital marketing, training courses, internships, and how to start projects.',
          },
          { role: 'user', content: input },
        ],
        temperature: 0.7,
        max_tokens: 250,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq request failed with status ${response.status}`);
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content?.trim();

    return text || 'Sorry, I could not generate a response right now.';
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return `I’m having trouble reaching the AI service right now. ${message}`;
  }
}

function WhatsAppButton() {
  const href = `https://wa.me/${7249761369}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
      className="flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-[0_12px_35px_rgba(37,211,102,0.35)]"
      style={{ background: '#25D366' }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2m0 1.67c2.19 0 4.25.85 5.8 2.4a8.18 8.18 0 0 1 2.41 5.82c0 4.53-3.69 8.22-8.23 8.22a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.53 3.7-8.2 8.25-8.2m-4.53 4.7c-.16 0-.42.06-.64.31-.22.24-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.16 1.7 2.72 4.19 3.7.58.25 1.04.4 1.4.51.59.19 1.12.16 1.55.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47Z" />
      </svg>
    </motion.a>
  );
}

export default function SkylantAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: 'Hi! I am Skylant AI. Ask me about our services, projects, or how to start your next build.',
    },
  ]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { id: Date.now(), sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setIsLoading(true);

    try {
      const aiReplyText = await getAiReply(trimmed);
      const aiReply: Message = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReplyText,
      };

      setMessages((prev) => [...prev, aiReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-4 w-[min(90vw,24rem)] overflow-hidden rounded-[28px] border border-[#E4DBFF] bg-[#FAF9F7]/90 shadow-[0_25px_70px_rgba(80,63,146,0.2)] backdrop-blur-xl"
          >
            <div className="border-b border-[#E4DBFF] bg-gradient-to-r from-[#F3F0FF] via-white/80 to-[#F8F7FF] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6D5BD0] to-[#2563EB] text-white shadow-sm">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#2C2A4A]">Skylant AI</p>
                    <p className="text-xs text-[#6D5BD0]">Always here to help</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full border border-[#E4DBFF] bg-white/80 p-2 text-[#5B5580] transition hover:bg-white"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[24rem] space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top_left,_rgba(109,91,208,0.08),_transparent_40%)] p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-[#2563EB] text-white'
                        : 'border border-[#E4DBFF] bg-white/80 text-[#2C2A4A]'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-[#E4DBFF] bg-white/80 px-3 py-2 text-sm text-[#5B5580] shadow-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[#E4DBFF] bg-white/70 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    disabled={isLoading}
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-[#E4DBFF] bg-[#F3F0FF] px-2.5 py-1.5 text-xs font-medium text-[#4B3F91] transition hover:bg-[#EDE9FE] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-[#E4DBFF] bg-[#FAF9F7] px-3 py-2">
                <MessageCircle className="h-4 w-4 text-[#6D5BD0]" />
                <input
                  value={draft}
                  disabled={isLoading}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      void sendMessage(draft);
                    }
                  }}
                  placeholder="Ask Skylant AI..."
                  className="flex-1 bg-transparent text-sm text-[#2C2A4A] outline-none placeholder:text-[#8783A6] disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => void sendMessage(draft)}
                  className="rounded-full bg-[#2563EB] p-2 text-white transition hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-70"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher row: WhatsApp button sits to the LEFT of the Skylant AI button */}
      <div className="flex items-center justify-end gap-3">
        <WhatsAppButton />

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-3 rounded-full border border-[#E4DBFF] bg-gradient-to-r from-[#6D5BD0] via-[#8B7AEF] to-[#2563EB] px-4 py-3 text-white shadow-[0_12px_35px_rgba(109,91,208,0.33)]"
          aria-label="Open Skylant AI assistant"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold">Skylant AI</span>
        </motion.button>
      </div>
    </div>
  );
}