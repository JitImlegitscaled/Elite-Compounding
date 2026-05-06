import { useState, useCallback, useRef } from 'react';
import { validateField, FieldKey } from '../utils/validateForm';
import { WEB3FORMS_URL, WEB3FORMS_ACCESS_KEY } from '../constants/api';
import { FacilityType } from '../constants/contact';

export interface FormFields {
  name: string;
  email: string;
  phone: string;
  facility: FacilityType;
  message: string;
}

export type FieldState = 'idle' | 'valid' | 'error';

export interface FieldStatus {
  state: FieldState;
  message: string;
}

type FieldStatuses = Record<FieldKey, FieldStatus>;

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const IDLE_STATUS: FieldStatus = { state: 'idle', message: '' };

export function useContactForm() {
  const [fields, setFields] = useState<FormFields>({
    name: '', email: '', phone: '', facility: '', message: '',
  });
  const [statuses, setStatuses] = useState<FieldStatuses>({
    name:    IDLE_STATUS,
    email:   IDLE_STATUS,
    phone:   IDLE_STATUS,
    message: IDLE_STATUS,
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const fieldsRef = useRef(fields);
  fieldsRef.current = fields;

  const computeStatus = useCallback((key: FieldKey, value: string): FieldStatus => {
    const error = validateField(key, value);
    if (error) return { state: 'error', message: `⚠ ${error}` };
    if (value.trim()) return { state: 'valid', message: '✓ Looks good' };
    return IDLE_STATUS;
  }, []);

  const handleChange = useCallback((key: keyof FormFields, value: string) => {
    setFields(prev => ({ ...prev, [key]: value }));
    if (key !== 'facility') {
      setStatuses(prev => {
        if (prev[key as FieldKey].state === 'error') {
          return { ...prev, [key]: computeStatus(key as FieldKey, value) };
        }
        return prev;
      });
    }
  }, [computeStatus]);

  const handleBlur = useCallback((key: FieldKey) => {
    setStatuses(prev => ({ ...prev, [key]: computeStatus(key, fieldsRef.current[key]) }));
  }, [computeStatus]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const current = fieldsRef.current;
    const keys: FieldKey[] = ['name', 'email', 'phone', 'message'];
    let hasError = false;
    const newStatuses = { ...statuses };
    keys.forEach(key => {
      const s = computeStatus(key, current[key]);
      newStatuses[key] = s;
      if (s.state === 'error') hasError = true;
    });
    setStatuses(newStatuses);
    if (hasError) return;

    setFormStatus('loading');

    const payload = {
      access_key:    WEB3FORMS_ACCESS_KEY,
      subject:       'New Assessment Request — Elite Compounding Agency',
      from_name:     current.name.trim(),
      replyto:       current.email.trim(),
      name:          current.name.trim(),
      email:         current.email.trim(),
      phone:         current.phone.trim(),
      facility_type: current.facility,
      message:       current.message.trim(),
      botcheck:      '',
    };

    try {
      const res  = await fetch(WEB3FORMS_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      });
      const data = await res.json() as { success: boolean };
      setFormStatus(data.success ? 'success' : 'error');
    } catch (_) {
      setFormStatus('error');
    }
  }, [statuses, computeStatus]);

  return { fields, statuses, formStatus, handleChange, handleBlur, handleSubmit } as const;
}
