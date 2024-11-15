import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

const PRICE_IDS = {
  basic: {
    monthly: 'price_H5jTxfSF316EM3',
    annual: 'price_H5jTxfSF316EM4'
  },
  professional: {
    monthly: 'price_H5jTxfSF316EM5',
    annual: 'price_H5jTxfSF316EM6'
  },
  enterprise: {
    monthly: 'price_H5jTxfSF316EM7',
    annual: 'price_H5jTxfSF316EM8'
  }
};

export async function createCheckoutSession(plan: string, billing: string) {
  try {
    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS]?.[billing as 'monthly' | 'annual'];
    
    if (!priceId) {
      throw new Error('Invalid plan or billing period');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/portal?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      customer_email: undefined, // Will be collected by Stripe Checkout
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}