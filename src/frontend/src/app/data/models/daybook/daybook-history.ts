export class DaybookLogHistoryObject {
  data: any;
}

export interface DaybookLogHistoryData {
  daybookLogHistory: [DaybookLogHistory];
}

export interface IDaybookLogHistory {
  id:             string;
  daybook_log_id: number;
  log:            string;
  created_at:     string;
  updated_at:     string;
}

export class DaybookLogHistory implements IDaybookLogHistory {
  id:             string;
  daybook_log_id: number;
  log:            string;
  created_at:     string;
  updated_at:     string;
}
