import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';
import crypto from 'crypto';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? 
    Environment.Production : 
    Environment.Sandbox
});

function verifyWebhookSignature(
  requestBody: string,
  signatureHeader: string,
  signingKey: string
): boolean {
  if (!signatureHeader || !signingKey) return false;

  const signature = crypto
    .createHmac('sha256', signingKey)
    .update(requestBody)
    .digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(signatureHeader)
  );
}

export const handler: Handler = async (event) => {
  // Debug logging
  console.log('Webhook received:', {
    method: event.httpMethod,
    path: event.path,
    headers: event.headers,
    body: event.body ? JSON.parse(event.body) : null
  });

  if (event.httpMethod !== 'POST') {
    console.log('Invalid method:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Verify webhook signature
  const signatureHeader = event.headers['x-square-hmacsha256-signature'];
  console.log('Verifying signature:', { 
    hasSignature: !!signatureHeader,
    hasSigningKey: !!process.env.SQUARE_WEBHOOK_SIGNING_KEY
  });

  const isValid = verifyWebhookSignature(
    event.body || '',
    signatureHeader || '',
    process.env.SQUARE_WEBHOOK_SIGNING_KEY || ''
  );

  if (!isValid) {
    console.error('Invalid webhook signature');
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid signature' })
    };
  }

  try {
    const payload = JSON.parse(event.body || '');
    const eventType = payload.type;

    console.log('Processing webhook event:', {
      type: eventType,
      data: payload.data
    });

    switch (eventType) {
      case 'catalog.version.updated':
        await syncCatalog();
        break;
      
      case 'subscription.updated':
        await handleSubscriptionUpdate(payload.data);
        break;

      case 'payment.updated':
      case 'payment.created':
        await handlePaymentUpdate(payload.data);
        break;

      case 'invoice.scheduled_charge_failed':
        await handleFailedCharge(payload.data);
        break;

      default:
        console.log('Unhandled event type:', eventType);
    }

    console.log('Webhook processed successfully');
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true })
    };
  } catch (error) {
    console.error('Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Webhook processing failed' })
    };
  }
};

async function syncCatalog() {
  try {
    const { result } = await squareClient.catalogApi.listCatalog(undefined, 'ITEM');
    const items = result.objects || [];
    console.log('Catalog synced:', items.length, 'items');
    return items;
  } catch (error) {
    console.error('Catalog sync failed:', error);
    throw error;
  }
}

async function handleSubscriptionUpdate(data: any) {
  const subscriptionId = data.id;
  const status = data.status;
  console.log('Subscription updated:', subscriptionId, status);
  // Update subscription status in your database
}

async function handlePaymentUpdate(data: any) {
  const paymentId = data.id;
  const status = data.status;
  console.log('Payment updated:', paymentId, status);
  // Update payment status in your database
}

async function handleFailedCharge(data: any) {
  const invoiceId = data.id;
  const failureReason = data.failure_reason;
  console.log('Invoice charge failed:', invoiceId, failureReason);
  // Handle failed charge (e.g., notify customer, retry payment)
}