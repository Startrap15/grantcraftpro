import OpenAI from 'openai';

let openai: OpenAI | null = null;

// Only initialize OpenAI if API key is present
if (import.meta.env.VITE_OPENAI_API_KEY?.startsWith('sk-')) {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });
}

const SYSTEM_PROMPT = `You are an expert grant writing assistant. You help users with:
- Grant writing tips and best practices
- Understanding grant requirements
- Proposal development strategies
- Budget preparation guidance
- Grant compliance information

Provide clear, concise, and professional responses. If a question is outside your expertise,
direct users to schedule a consultation with our team.`;

export async function getChatbotResponse(userMessage: string): Promise<string> {
  // If OpenAI isn't initialized, use default responses
  if (!openai) {
    return getDefaultResponse(userMessage);
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userMessage }
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 200
    });

    return completion.choices[0]?.message?.content || getDefaultResponse(userMessage);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return getDefaultResponse(userMessage);
  }
}

function getDefaultResponse(input: string): string {
  const defaultResponses = {
    grant: 'We offer comprehensive grant writing services. Would you like to schedule a consultation to discuss your needs?',
    proposal: 'Our team specializes in proposal development. How can we assist you with your proposal?',
    cost: 'Our pricing varies based on project scope. Would you like to schedule a free consultation?',
    consultation: 'I can help you schedule a free consultation with our expert team. Would you like to proceed?',
    deadline: 'We understand the importance of deadlines. Our team can help ensure your proposal is submitted on time.',
    default: 'I\'d be happy to help you with grant writing or proposals. Could you provide more specific details about your needs?'
  };

  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes('grant')) return defaultResponses.grant;
  if (lowercaseInput.includes('proposal')) return defaultResponses.proposal;
  if (lowercaseInput.includes('cost') || lowercaseInput.includes('price')) return defaultResponses.cost;
  if (lowercaseInput.includes('consultation')) return defaultResponses.consultation;
  if (lowercaseInput.includes('deadline')) return defaultResponses.deadline;
  
  return defaultResponses.default;
}