import emailjs from '@emailjs/browser';

type EmailTemplateType = 'contact' | 'career' | 'homeQuery';

const emailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  contactTemplateId: import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
  careerTemplateId: import.meta.env.VITE_EMAILJS_CAREER_TEMPLATE_ID || '',
  homeQueryTemplateId: import.meta.env.VITE_EMAILJS_HOME_QUERY_TEMPLATE_ID || '',
};

function getTemplateId(type: EmailTemplateType) {
  switch (type) {
    case 'contact':
      return emailJsConfig.contactTemplateId;
    case 'career':
      return emailJsConfig.careerTemplateId;
    case 'homeQuery':
      return emailJsConfig.homeQueryTemplateId;
    default:
      return '';
  }
}

export async function sendEmailForm(type: EmailTemplateType, templateParams: Record<string, unknown>) {
  const templateId = getTemplateId(type);

  if (!emailJsConfig.publicKey || !emailJsConfig.serviceId || !templateId) {
    throw new Error('EmailJS is not configured yet. Please add your EmailJS public key, service ID, and template IDs in the environment variables.');
  }

  emailjs.init(emailJsConfig.publicKey);
  console.log("Public Key:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  console.log("Service ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
  console.log("Career Template:", import.meta.env.VITE_EMAILJS_CAREER_TEMPLATE_ID);
  return emailjs.send(emailJsConfig.serviceId, templateId, templateParams, emailJsConfig.publicKey);
}
