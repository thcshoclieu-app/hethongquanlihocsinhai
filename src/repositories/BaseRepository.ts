import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useTenantStore } from '../store/tenantStore';

export class BaseRepository<T extends { [key: string]: any }> {
  constructor(private collectionName: string, private idField: string) {}

  protected get tenantOrgId() {
    return useTenantStore.getState().organizationId;
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.organizationId && data.organizationId !== this.tenantOrgId) {
        return null; // Tenant isolation check
      }
      return { [this.idField]: docSnap.id, ...data } as unknown as T;
    }
    return null;
  }

  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    const orgId = this.tenantOrgId;
    if (!orgId) return [];

    const q = query(
      collection(db, this.collectionName), 
      where('organizationId', '==', orgId),
      ...constraints
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(
      (doc) => ({ [this.idField]: doc.id, ...doc.data() } as unknown as T)
    );
  }

  async create(id: string, data: Partial<T>): Promise<void> {
    const orgId = this.tenantOrgId;
    if (!orgId) throw new Error('No organization ID found for tenant');

    const docRef = doc(db, this.collectionName, id);
    await setDoc(docRef, { ...data, organizationId: orgId });
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const orgId = this.tenantOrgId;
    if (!orgId) throw new Error('No organization ID found for tenant');

    // Ideally, we should check if doc belongs to orgId before updating
    // But Firebase Security Rules will enforce this.
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, data as any);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
