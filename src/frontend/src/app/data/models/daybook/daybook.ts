import { PaginatorInfo } from '@data/models/common/paginator-info';
import { IDaybookDate } from '@data/models/daybook/daybook-date';

//#region Mlutiple Data Item

export class DaybooksRootObject {
  data: DaybooksData;
}

class DaybooksData {
  daybooks: Daybooks;
}

export class Daybooks {
  data: [];
  paginatorInfo: PaginatorInfo;
}

//#endregion


//#region Single Data Item

export class DaybookRootObject {
  data: DaybookData;
  loading: boolean;
}

class DaybookData {
  daybook: Daybook;
}

//#endregion

// Base entity
export interface IDaybook {
  id: string;
  title: string;
  description: any;
  icon?: any;
  color?: any;
  archive: boolean;
  created_at: string;
  updated_at: string;
  dates: IDaybookDate[];
}

export class Daybook implements IDaybook {
  id: string;
  title: string = '';
  description: any = '';
  icon?: any;
  color?: any;
  archive: boolean;
  created_at: string;
  updated_at: string;
  dates: IDaybookDate[];
}
