import { MaterialModule } from '@shared/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DayRoutingModule } from './day.routing';
import { DayBookComponent } from './page/day-book/day-book.component';
import { CalendarViewComponent } from '@shared/components/daybook/calendar-view/calendar-view.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DateLogsComponent } from './page/date-logs/date-logs.component';
import { ItemCardComponent } from '@shared/components/common/item-card/item-card.component';
import { DaybooksComponent } from './page/daybooks/daybooks.component';

@NgModule({
  declarations: [
    DayBookComponent,
    CalendarViewComponent,
    DateLogsComponent,
    DaybooksComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DayRoutingModule,
    CKEditorModule
  ],
  exports:[

  ],
  providers: [

  ]
})
export class DayModule {}
