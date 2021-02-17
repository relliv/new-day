import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateLogsComponent } from './page/date-logs/date-logs.component';
import { DayBookComponent } from './page/day-book/day-book.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'book/:id',
        component: DayBookComponent,
      },
      {
        path: 'book/:id/logs/:date',
        component: DateLogsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayRoutingModule {}
