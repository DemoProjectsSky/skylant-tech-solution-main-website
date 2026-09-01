import {
  Search,
  FileText,
  Share as ShareIcon,
  Mail,
  Megaphone,
  MapPin,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Settings,
  Target,
  MessageSquareWarning,
  MousePointerClick,
  Hourglass,
  Globe2,
  LucideIcon,
} from 'lucide-react';

export interface BlogSection {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

export interface BlogContent {
  slug: string;
  intro: string;
  sections: BlogSection[];
  finalThoughtsTitle: string;
  finalThoughts: string;
}

export const blogContents: BlogContent[] = [
  {
    slug: 'digital-marketing-tips-grow-business-2026',

    intro:
      "In today's digital world, having a website is not enough. Businesses need a smart digital marketing strategy to attract customers, generate leads, and build long-term brand value — here are 10 proven ways to stay ahead of the competition.",

    sections: [
      {
        icon: Search,
        title: 'SEO Optimization',
        desc: 'Target the right keywords, optimize content, and improve site performance to rank higher on Google and grow organic traffic.',
        color: '#2563EB',
      },
      {
        icon: FileText,
        title: 'Content Marketing',
        desc: 'Publish blogs, guides, and case studies that solve real customer problems and position your brand as an industry expert.',
        color: '#EC4899',
      },
      {
        icon: ShareIcon,
        title: 'Social Media Marketing',
        desc: 'Use LinkedIn, Facebook, Instagram, and X to engage customers directly, build awareness, and generate quality leads.',
        color: '#8B5CF6',
      },
      {
        icon: Mail,
        title: 'Email Marketing Campaigns',
        desc: 'Personalized email flows nurture leads, improve retention, and turn one-time buyers into repeat customers.',
        color: '#F97316',
      },
      {
        icon: Megaphone,
        title: 'Paid Advertising',
        desc: 'Google Ads and social campaigns put your business in front of highly targeted audiences for faster results.',
        color: '#22C55E',
      },
      {
        icon: MapPin,
        title: 'Local SEO',
        desc: 'An optimized Google Business Profile and local listings help nearby customers find you when it matters most.',
        color: '#14B8A6',
      },
      {
        icon: Smartphone,
        title: 'Mobile Optimization',
        desc: 'A fast, mobile-friendly site keeps the majority of your visitors engaged and improves search rankings.',
        color: '#2563EB',
      },
      {
        icon: BarChart3,
        title: 'Analytics & Performance Tracking',
        desc: 'Google Analytics and similar tools turn campaign data into clear, data-driven decisions.',
        color: '#7C3AED',
      },
      {
        icon: ShieldCheck,
        title: 'Brand Consistency',
        desc: 'The same voice, colors, and message across every channel builds trust and recognition over time.',
        color: '#1E3A8A',
      },
      {
        icon: Settings,
        title: 'Marketing Automation',
        desc: 'Automate follow-ups, lead nurturing, and social scheduling to save time and scale effort-free.',
        color: '#16A34A',
      },
    ],

    finalThoughtsTitle: 'Final Thoughts',

    finalThoughts:
      'Successful digital marketing requires the right strategy, tools, and execution. At Skylant Tech Solutions, we help businesses improve online visibility, generate quality leads, and accelerate growth through SEO, social media marketing, paid advertising, website development, and business automation solutions.',
  },

  {
    slug: 'why-digital-marketing-isnt-generating-leads',

    intro:
      "Digital marketing has become one of the most powerful ways for businesses to attract customers, build brand awareness, and generate sales. So what happens when you invest time and money into digital marketing and still get very few leads? Why Digital Marketing Isn't Generating Leads is a question many businesses ask when their campaigns receive views, clicks, or website traffic but do not bring customers. The good news is that poor lead generation doesn't always mean digital marketing is ineffective — in most cases the problem lies in the strategy, targeting, content, website, or conversion process. Here are the common reasons behind it.",

    sections: [
      {
        icon: Target,
        title: 'You Are Targeting the Wrong Audience',
        desc: "Your ads and content may reach people, but those people may not be interested in your product or service. A successful strategy starts by understanding your customer — their age, location, interests, problems, buying behavior and search intent. The more accurately you define your audience, the better your chances of generating qualified leads.",
        color: '#2563EB',
      },
      {
        icon: MessageSquareWarning,
        title: "Your Content Isn't Solving a Problem",
        desc: 'People do not engage with content simply because a business wants to promote something — they engage with content that provides value. If your content only talks about your company, services or offers, it may fail to attract customers. Create blogs, videos, guides, case studies and social posts that solve problems and build trust.',
        color: '#EC4899',
      },
      {
        icon: Globe2,
        title: 'Your Website Is Not Converting Visitors',
        desc: "You may successfully bring visitors to your website, but if it's confusing or difficult to use, those visitors will leave without contacting you. Your website should have clear headlines, simple navigation, fast loading speed, mobile-friendly design, strong calls-to-action and easy-to-find contact forms.",
        color: '#8B5CF6',
      },
      {
        icon: MousePointerClick,
        title: 'Your Call-to-Action Is Weak',
        desc: 'A visitor needs a clear reason to take action. If your website just says "Learn More" without explaining what happens next, visitors won\'t convert. Instead of generic CTAs, use action-focused messages such as "Get a Free Consultation," "Request a Quote," "Book a Call," or "Start Your Project."',
        color: '#F97316',
      },
      {
        icon: Hourglass,
        title: 'You Are Expecting Immediate Results',
        desc: 'Digital marketing is not always an instant solution. SEO, content marketing, social media and paid advertising all require testing and optimization. If you stop campaigns early — before your strategy has had time to gain traction — you lose the leads that a slightly longer runway would have delivered.',
        color: '#22C55E',
      },
    ],

    finalThoughtsTitle: 'Final Thoughts',

    finalThoughts:
      "Low leads don't always mean digital marketing has failed — they usually point to a gap somewhere in the strategy, targeting, content, website, or follow-up process. At Skylant Tech Solutions, we help businesses fix these gaps with the right audience research, conversion-focused websites, and data-driven campaigns that turn traffic into real leads.",
  },
];