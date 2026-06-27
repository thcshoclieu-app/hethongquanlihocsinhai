import { BaseRepository } from './BaseRepository';
import { Payment } from '../types';
import { COLLECTIONS } from '../constants/collections';

class PaymentRepositoryClass extends BaseRepository<Payment> {
  constructor() {
    super(COLLECTIONS.PAYMENTS, 'paymentId');
  }
}

export const PaymentRepository = new PaymentRepositoryClass();
