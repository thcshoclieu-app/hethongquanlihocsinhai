import { useState, useEffect, useCallback } from 'react';
import { Payment } from '../types';
import { PaymentService } from '../services/PaymentService';

export function usePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await PaymentService.getPayments();
      setPayments(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch payments'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return { payments, loading, error, refetch: fetchPayments };
}
