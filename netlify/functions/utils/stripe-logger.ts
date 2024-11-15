import { WebhookEvent } from '@stripe/stripe-js';

export function logEvent(type: string, message: string, data?: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    type,
    message,
    ...(data && { data }),
  };
  console.log(JSON.stringify(logEntry));
}

export function logWebhookEvent(event: WebhookEvent) {
  logEvent('INFO', 'Webhook event received', {
    type: event.type,
    id: event.id,
    created: new Date(event.created * 1000).toISOString(),
  });
}