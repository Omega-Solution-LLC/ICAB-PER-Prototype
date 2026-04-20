import { DEMO_STUDENTS, DEMO_PRINCIPAL } from './demo-data';
import { User } from '@/types';

export function login(email: string, password: string): User | null {
  // Hardcoded demo logic
  if (email === DEMO_PRINCIPAL.email && password === 'admin') {
    return DEMO_PRINCIPAL;
  }
  const student = DEMO_STUDENTS.find(s => s.email === email);
  if (student && password === 'password') {
    return student;
  }
  return null;
}

export function getSession(): User | null {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('icab-per-session');
    if (data) return JSON.parse(data) as User;
  }
  return null;
}

export function setSession(user: User) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('icab-per-session', JSON.stringify(user));
  }
}

export function clearSession() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('icab-per-session');
  }
}
