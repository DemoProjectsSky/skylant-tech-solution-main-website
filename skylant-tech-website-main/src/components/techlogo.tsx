import { useState } from 'react';

/* ---------------------------------------------------------------------
   TechLogo
   Renders a technology's real logo via the Simple Icons CDN
   (https://cdn.simpleicons.org/<slug>). Falls back to a colored
   letter avatar if the technology isn't in the slug map, or if the
   logo fails to load. Shared by ServiceIllustration and the
   Technologies grid on the Services page.
--------------------------------------------------------------------- */

// Best-effort mapping of technology display names -> Simple Icons slugs.
export const LOGO_SLUGS: Record<string, string> = {
  'React': 'react',
  'React Native': 'react',
  'Node.js': 'nodedotjs',
  'Python': 'python',
  'Java': 'openjdk',
  'PostgreSQL': 'postgresql',
  'MongoDB': 'mongodb',
  'MySQL': 'mysql',
  'AWS': 'amazonaws',
  'Next.js': 'nextdotjs',
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Tailwind CSS': 'tailwindcss',
  'WordPress': 'wordpress',
  'Webflow': 'webflow',
  'Flutter': 'flutter',
  'Swift': 'swift',
  'Kotlin': 'kotlin',
  'Firebase': 'firebase',
  'Redux': 'redux',
  'TensorFlow': 'tensorflow',
  'PyTorch': 'pytorch',
  'OpenAI API': 'openai',
  'LangChain': 'langchain',
  'Hugging Face': 'huggingface',
  'Azure': 'microsoftazure',
  'Google Cloud': 'googlecloud',
  'Kubernetes': 'kubernetes',
  'Terraform': 'terraform',
  'Docker': 'docker',
  'Selenium': 'selenium',
  'Zapier': 'zapier',
  'n8n': 'n8n',
  'Apache Kafka': 'apachekafka',
  'Celery': 'celery',
  'Figma': 'figma',
  'Adobe XD': 'adobexd',
  'Sketch': 'sketch',
  'InVision': 'invision',
  'Zeplin': 'zeplin',
  'Storybook': 'storybook',
  'Google Analytics': 'googleanalytics',
  'SEMrush': 'semrush',
  'HubSpot': 'hubspot',
  'Mailchimp': 'mailchimp',
  'Meta Ads': 'meta',
  'Google Ads': 'googleads',
  'Git': 'git',
  'GitHub': 'github',
  'Vue.js': 'vuedotjs',
  'Angular': 'angular',
  'Express': 'express',
  'Django': 'django',
  'Ruby on Rails': 'rubyonrails',
  'PHP': 'php',
  'Laravel': 'laravel',
  'Go': 'go',
  'Rust': 'rust',
  'GraphQL': 'graphql',
  'Redis': 'redis',
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function TechLogo({ name, color, size = 22 }: { name: string; color: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const slug = LOGO_SLUGS[name] || slugify(name);

  if (failed) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: size * 0.5,
          fontWeight: 700,
          color,
        }}
      >
        {name[0]}
      </div>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={name}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      style={{ objectFit: 'contain' }}
    />
  );
}