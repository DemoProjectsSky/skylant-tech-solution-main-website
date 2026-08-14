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

async function getAiReply(input: string) {
  const normalized = input.toLowerCase();

  if (normalized.includes('service') || normalized.includes('services')) {
    return 'We build web apps, mobile apps, AI solutions, ERP systems, and cloud platforms tailored to your business goals.';
  }

  if (normalized.includes('price') || normalized.includes('cost') || normalized.includes('budget')) {
    return 'We tailor the scope to your budget and timeline, so we can suggest the right approach for your startup or enterprise team.';
  }

  if (normalized.includes('app') || normalized.includes('website')) {
    return 'Absolutely. We can turn your idea into a polished product with design, development, deployment, and ongoing support.';
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
              'You are Skylant AI, a helpful assistant for Skylant Technologies. Answer briefly, professionally, and in a friendly tone. Focus on software development, websites, mobile apps, AI solutions, cloud, ERP, and how to start projects.',
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