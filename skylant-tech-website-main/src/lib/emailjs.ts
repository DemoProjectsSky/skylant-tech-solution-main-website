import emailjs from '@emailjs/browser';

type EmailTemplateType = 'contact' | 'career' | 'homeQuery';

const emailJsConfig = {
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  contactTemplateId:
    import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID || '',
  careerTemplateId:
    import.meta.env.VITE_EMAILJS_CAREER_TEMPLATE_ID || '',
  homeQueryTemplateId:
    import.meta.env.VITE_EMAILJS_HOME_QUERY_TEMPLATE_ID || '',
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

export async function sendEmailForm(
  type: EmailTemplateType,
  data: HTMLFormElement | Record<string, unknown>
) {
  const templateId = getTemplateId(type);

  if (
    !emailJsConfig.publicKey ||
    !emailJsConfig.serviceId ||
    !templateId
  ) {
    throw new Error(
      'EmailJS is not configured yet. Please add your EmailJS public key, service ID, and template IDs in the environment variables.'
    );
  }

  emailjs.init({
    publicKey: emailJsConfig.publicKey,
  });

  // Career form contains resume attachment,
  // so use sendForm() for the actual HTML form.
  if (data instanceof HTMLFormElement) {
    return emailjs.sendForm(
      emailJsConfig.serviceId,
      templateId,
      data,
      {
        publicKey: emailJsConfig.publicKey,
      }
    );
  }

  // For normal forms using template parameters
  return emailjs.send(
    emailJsConfig.serviceId,
    templateId,
    data,
    {
      publicKey: emailJsConfig.publicKey,
    }
  );
}