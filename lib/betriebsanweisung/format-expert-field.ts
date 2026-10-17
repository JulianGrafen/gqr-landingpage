import type { AgwTrgs900Field, ExpertDataField } from '@/config/betriebsanweisung/types';

export function formatExpertDataField(field: ExpertDataField): string {
  if (field.kind === 'value') return field.text;
  return field.note;
}

export function formatAgwField(field: AgwTrgs900Field): string {
  if (field.kind === 'limit') return field.text;
  return field.note;
}
