import type { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { logEvent } from './utils/stripe-logger';
import {
  handleCheckoutCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted
} from './utils/stripe-handlers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handler: Handler = async (event) => {
  try {
    logEvent('INFO', 'Webhook request received', {
      method: event.httpMethod,
      path: event.path,
      headers: {
        'content-type': event.headers['content-type'],
        'stripe-signature': event.headers['stripe-signature'] ? 'present' : 'missing',
      },
    });

    if (event.httpMethod !== 'POST') {
      logEvent('ERROR', 'Invalid HTTP method', { method: event.httpMethod });
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    if (!webhookSecret) {
      logEvent('ERROR', 'Webhook secret not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Webhook secret not configured' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    const sig = event.headers['stripe-signature'];
    if (!sig) {
      logEvent('ERROR', 'Missing Stripe signature');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Stripe signature missing' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    logEvent('INFO', 'Verifying Stripe signature');
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body || '',
      sig,
      webhookSecret
    );

    logEvent('INFO', 'Webhook verified successfully', { 
      eventType: stripeEvent.type,
      eventId: stripeEvent.id 
    });

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        logEvent('WARN', 'Unhandled event type', { type: stripeEvent.type });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true, type: stripeEvent.type }),
      headers: { 'Content-Type': 'application/json' }
    };

  } catch (error) {
    logEvent('ERROR', 'Webhook processing failed', { 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: `Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};