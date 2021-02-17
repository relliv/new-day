import { IDaybookLog, IFirstDaybookDateLog } from '@data/models/daybook/daybook-log';
import { IDaybook } from '@data/models/daybook/daybook';

export class DaybookDateRootObject {
  data: DaybookDateData;
  daybook: IDaybook
}

class DaybookDateData {
  whereDaybookDate: DaybookDate;
}

export class IDaybookDate {
  id: string;
  daybook_id: number;
  target_date: string;
  logs: [ IDaybookLog | IFirstDaybookDateLog | any ];
  log_count?: number;
  last_log: IDaybookLog;
  created_at: string;
  updated_at: string;
}

export class DaybookDate implements IDaybookDate {
  id: string;
  daybook_id: number;
  target_date: string;
  logs: [ IDaybookLog | IFirstDaybookDateLog | any ];
  log_count?: number;
  last_log: IDaybookLog;
  created_at: string;
  updated_at: string;
}
