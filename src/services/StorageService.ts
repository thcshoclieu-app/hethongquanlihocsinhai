import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { STORAGE_FOLDERS } from '../constants/storage';

export class StorageService {
  static async uploadFile(folder: string, file: File, fileName?: string): Promise<string> {
    const name = fileName || `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  static async deleteFile(fileUrl: string): Promise<void> {
    const storageRef = ref(storage, fileUrl);
    await deleteObject(storageRef);
  }

  static async uploadAvatar(file: File, userId: string): Promise<string> {
    return this.uploadFile(STORAGE_FOLDERS.AVATARS, file, `avatar_${userId}_${Date.now()}`);
  }

  static async uploadAttendancePhoto(file: File, attendanceId: string): Promise<string> {
    return this.uploadFile(STORAGE_FOLDERS.ATTENDANCE, file, `attendance_${attendanceId}`);
  }

  static async uploadReport(file: File, reportName: string): Promise<string> {
    return this.uploadFile(STORAGE_FOLDERS.REPORTS, file, reportName);
  }
}
