import emailjs from '@emailjs/browser';

interface ConsultationFormData {
  name: string;
  email: string;
  organization?: string;
  message: string;
  date?: string;
  time?: string;
  phone?: string;
}

export async function sendConsultationEmail(formData: ConsultationFormData): Promise<void> {
  const templateParams = {
    to_email: 'donnie@donnietroymedia.com',
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone || 'Not provided',
    organization: formData.organization || 'Not provided',
    message: formData.message,
    consultation_date: formData.date || 'Not selected',
    consultation_time: formData.time || 'Not selected',
  };

  try {
    await emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send consultation request. Please try again later.');
  }
}