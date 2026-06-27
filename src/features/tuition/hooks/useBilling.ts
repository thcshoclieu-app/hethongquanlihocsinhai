import { useState, useEffect } from 'react';
import { Invoice, InvoiceItem, PaymentReceipt, BillingRule } from '@/types';

export function useBilling() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock fetching logic for now
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setInvoices([
        {
          invoiceId: 'INV-001',
          studentId: 'STD-001',
          classId: 'IELTS-A',
          month: 10,
          year: 2023,
          subtotal: 1500000,
          discount: 150000,
          scholarshipAmount: 0,
          tax: 0,
          total: 1350000,
          paid: 1350000,
          remaining: 0,
          status: 'paid',
          dueDate: '2023-11-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          invoiceId: 'INV-002',
          studentId: 'STD-002',
          classId: 'IELTS-A',
          month: 10,
          year: 2023,
          subtotal: 1500000,
          discount: 0,
          scholarshipAmount: 0,
          tax: 0,
          total: 1500000,
          paid: 500000,
          remaining: 1000000,
          status: 'issued',
          dueDate: '2023-11-10',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  return { invoices, isLoading };
}
