// utils/deviceId.ts
import { v4 as uuidv4 } from 'uuid';

export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
}

export function removeDeviceId() {
  localStorage.removeItem('device_id');
}
