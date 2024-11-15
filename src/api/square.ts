import { payments } from '@square/web-sdk';

let square: any = null;

export async function initSquare() {
  const appId = import.meta.env.VITE_SQUARE_APP_ID;
  const locationId = import.meta.env.VITE_SQUARE_LOCATION_ID;

  if (!appId || !locationId) {
    throw new Error('Square credentials not configured. Please check your environment variables.');
  }

  if (!square) {
    try {
      square = await payments.connect({
        applicationId: appId,
        locationId: locationId,
        environment: import.meta.env.PROD ? 'production' : 'sandbox'
      });
    } catch (error) {
      console.error('Failed to initialize Square:', error);
      throw new Error('Failed to initialize payment system');
    }
  }

  return square;
}

export async function createPayment(card: any, amount: number) {
  try {
    const square = await initSquare();
    
    // Get a payment token from Square
    const tokenResult = await square.tokenize(card);

    if (tokenResult.status === 'OK') {
      // Send the payment token to our backend
      const response = await fetch('/.netlify/functions/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceId: tokenResult.token,
          amount: amount,
          currency: 'USD'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment request failed');
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Payment failed');
      }

      return {
        success: true,
        payment: result.payment,
        orderId: result.orderId
      };
    } else {
      throw new Error(tokenResult.errors[0].message);
    }
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw error instanceof Error ? error : new Error('Payment failed');
  }
}