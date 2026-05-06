export const FACILITY_TYPES = [
  '503A Pharmacy',
  '503B Outsourcing Facility',
  'Hospital IV Room',
  'Oncology Clinic',
  'Nuclear Pharmacy',
  'Other',
] as const;

export type FacilityType = (typeof FACILITY_TYPES)[number] | '';
