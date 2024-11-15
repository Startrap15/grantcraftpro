import { Handler } from '@netlify/functions';
import { Client, Environment } from 'square';

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? 
    Environment.Production : 
    Environment.Sandbox
});

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    const { sourceId, amount, currency = 'USD' } = JSON.parse(event.body || '');

    // Validate required parameters
    if (!sourceId || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required parameters' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Create a unique idempotency key for this payment attempt
    const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Make the payment request to Square
    const response = await fetch('https://connect.squareupsandbox.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'Square-Version': '2024-01-17'
      },
      body: JSON.stringify({
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: BigInt(amount * 100), // Convert dollars to cents
          currency
        },
        location_id: process.env.SQUARE_LOCATION_ID,
        autocomplete: true, // Immediately complete the payment
        note: 'Subscription Payment'
      })
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors?.[0]?.detail || 'Payment failed');
    }

    // Parse and return the successful payment result
    const paymentResult = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        payment: paymentResult.payment,
        orderId: paymentResult.payment.order_id
      }),
      headers: { 'Content-Type': 'application/json' }
    };

  } catch (error) {
    console.error('Payment processing error:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false,
        error: 'Payment processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
};