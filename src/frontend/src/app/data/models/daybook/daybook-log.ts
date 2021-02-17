import { IDaybookDate } from '@data/models/daybook/daybook-date';

export interface IDaybookLog {
  id: string;
  log: string;
  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}

export class DaybookLog implements IDaybookLog {
  id: string;
  log: string;
  created_at: string;
  updated_at: string;

  isSaving: boolean;
  isEditing: boolean;
}

export class FirstDaybookDateLogData {
  firstDaybookDateLog: FirstDaybookDateLog;
}

export interface IFirstDaybookDateLog {
  id: string;
  daybook_id: number;
  daybook_date_id: number;
  title: string;
  log: string;
  created_at: string;
  updated_at: string;
  daybook_date: IDaybookDate;
  isSaving: boolean;
  isEditing: boolean;
}

export class FirstDaybookDateLog implements IFirstDaybookDateLog {
  id: string;
  daybook_id: number;
  daybook_date_id: number;
  title: string;
  log: string;
  created_at: string;
  updated_at: string;
  daybook_date: IDaybookDate;
  isSaving: boolean;
  isEditing: boolean;
}
