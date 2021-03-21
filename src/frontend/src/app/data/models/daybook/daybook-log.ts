import { IDaybookDate } from '@data/models/daybook/daybook-date';

export interface IDaybookLog {
  id: number;
  _title: any;
  title: any;
  log: string;
  history_count: number;

  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}

export class DaybookLog implements IDaybookLog {
  id: number;
  _title: any;
  title: any;
  log: string;
  history_count: number;

  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}
