export class AuditLog {
  static async log(action: string, details: any, userId: string = 'system') {
    const timestamp = new Date().toISOString();
    console.log(`[AUDIT LOG] ${timestamp} | User: ${userId} | Action: ${action}`, details);
    
    // In a real application, save to Firestore:
    // await addDoc(collection(db, 'logs'), { action, details, userId, timestamp });
  }
}
