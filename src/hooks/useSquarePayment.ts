import { useState, useEffect } from 'react';
import { initSquare } from '../api/square';

export function useSquarePayment() {
  const [paymentForm, setPaymentForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initializeSquare() {
      try {
        const square = await initSquare();
        const form = await square.card();
        await form.attach('#card-container');
        setPaymentForm(form);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment form');
      } finally {
        setLoading(false);
      }
    }

    initializeSquare();

    return () => {
      if (paymentForm) {
        paymentForm.destroy();
      }
    };
  }, []);

  return { paymentForm, loading, error };
}