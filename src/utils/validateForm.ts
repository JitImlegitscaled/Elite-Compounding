export type FieldKey = 'name' | 'email' | 'phone' | 'message';

export function validateField(key: FieldKey, value: string): string {
  if (key === 'name') {
    if (!value.trim()) return 'Full name is required';
    if (value.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  }
  if (key === 'email') {
    if (!value.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Enter a valid email address';
    return '';
  }
  if (key === 'phone') {
    if (value.trim() && !/^\+?[\d][\d\s\-()]{5,}[\d]$/.test(value.trim()))
      return 'Enter a valid phone number';
    return '';
  }
  if (key === 'message') {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
    return '';
  }
  return '';
}
