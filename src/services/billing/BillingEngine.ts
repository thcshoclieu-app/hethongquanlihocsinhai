import { BillingRule, ClassSession, Attendance, Invoice, InvoiceItem, DiscountPolicy, Scholarship } from '@/types';
import { isSameMonth, parseISO } from 'date-fns';

export class BillingEngine {
  static generateInvoice(
    studentId: string,
    classId: string,
    month: number,
    year: number,
    rule: BillingRule,
    sessions: ClassSession[],
    attendances: Attendance[],
    discounts: DiscountPolicy[],
    scholarship?: Scholarship
  ): { invoice: Omit<Invoice, 'invoiceId' | 'createdAt' | 'updatedAt'>, items: Omit<InvoiceItem, 'itemId' | 'invoiceId'>[] } {
    const items: Omit<InvoiceItem, 'itemId' | 'invoiceId'>[] = [];
    let subtotal = 0;

    // Filter sessions for the target month/year
    const targetMonthSessions = sessions.filter(session => {
      const date = parseISO(session.date);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });

    if (rule.billingType === 'session' || rule.billingType === 'actual_session') {
      targetMonthSessions.forEach(session => {
        // Find attendance for this session
        const attendance = attendances.find(a => a.studentId === studentId && a.date === session.date);
        
        let shouldCharge = false;
        
        if (rule.billingType === 'actual_session') {
           if (attendance && attendance.status === 'present') shouldCharge = true;
           if (attendance && attendance.status === 'late') shouldCharge = true;
        } else {
           // 'session' type logic - might charge based on policy
           if (!attendance) {
               shouldCharge = true; // No attendance recorded yet, assume we charge (or not, depending on business logic, let's assume we charge if scheduled)
           } else {
               if (attendance.status === 'present' || attendance.status === 'late') shouldCharge = true;
               if (attendance.status === 'excused' && rule.policy.chargeExcusedAbsence) shouldCharge = true;
               if (attendance.status === 'absent' && rule.policy.chargeUnexcusedAbsence) shouldCharge = true;
           }
        }
        
        if (session.status === 'holiday' || session.status === 'cancelled') {
           shouldCharge = false;
        }

        if (session.status === 'makeup' && !rule.policy.chargeMakeup) {
           shouldCharge = false;
        }

        if (shouldCharge) {
          const amount = rule.unitPrice;
          subtotal += amount;
          items.push({
            sessionId: session.sessionId,
            description: `Học phí buổi ${session.date}`,
            quantity: 1,
            unitPrice: rule.unitPrice,
            amount: amount
          });
        }
      });
    } else if (rule.billingType === 'month') {
        const amount = rule.unitPrice;
        subtotal += amount;
        items.push({
            description: `Học phí tháng ${month}/${year}`,
            quantity: 1,
            unitPrice: rule.unitPrice,
            amount: amount
        });
    }

    // Calculate Discounts
    let discountAmount = 0;
    discounts.forEach(discount => {
      if (discount.type === 'percentage') {
        discountAmount += subtotal * (discount.value / 100);
      } else if (discount.type === 'fixed_amount') {
        discountAmount += discount.value;
      }
    });

    // Calculate Scholarship
    let scholarshipAmount = 0;
    if (scholarship) {
      if (scholarship.type === '100%') scholarshipAmount = subtotal;
      else if (scholarship.type === '75%') scholarshipAmount = subtotal * 0.75;
      else if (scholarship.type === '50%') scholarshipAmount = subtotal * 0.5;
      else if (scholarship.type === '25%') scholarshipAmount = subtotal * 0.25;
      else if (scholarship.type === 'custom' && scholarship.customValue) scholarshipAmount = subtotal * (scholarship.customValue / 100);
    }

    const totalDiscount = discountAmount + scholarshipAmount;
    let total = subtotal - totalDiscount;
    if (total < 0) total = 0;

    const dueDate = new Date(year, month, 10).toISOString().split('T')[0]; // Due by 10th of next month

    const invoice: Omit<Invoice, 'invoiceId' | 'createdAt' | 'updatedAt'> = {
      studentId,
      classId,
      month,
      year,
      subtotal,
      discount: discountAmount,
      scholarshipAmount,
      tax: 0,
      total,
      paid: 0,
      remaining: total,
      status: 'draft',
      dueDate
    };

    return { invoice, items };
  }
}
