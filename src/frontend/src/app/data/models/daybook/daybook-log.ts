import { IDaybookDate } from '@data/models/daybook/daybook-date';

export interface IDaybookLog {
  id: number;
  log: string;
  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}

export class DaybookLog implements IDaybookLog {
  id: number;
  log: string;
  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}
