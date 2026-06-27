import { PaymentRepository } from '../repositories/PaymentRepository';
import { Payment } from '../types';

export class PaymentService {
  static async getPayments(): Promise<Payment[]> {
    return PaymentRepository.getAll();
  }

  static async getPayment(id: string): Promise<Payment | null> {
    return PaymentRepository.getById(id);
  }

  static async createPayment(data: Partial<Payment>): Promise<void> {
    const id = data.paymentId || crypto.randomUUID();
    await PaymentRepository.create(id, { ...data, paymentId: id });
  }

  static async updatePayment(id: string, data: Partial<Payment>): Promise<void> {
    await PaymentRepository.update(id, data);
  }

  static async deletePayment(id: string): Promise<void> {
    await PaymentRepository.delete(id);
  }
}
