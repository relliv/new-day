import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateLogsComponent } from './page/date-logs/date-logs.component';
import { DayBookComponent } from './page/day-book/day-book.component';
import { DaybooksComponent } from './page/daybooks/daybooks.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Day'
    },
    children: [
      {
        path: 'books',
        children: [
          {
            path: '',
            component: DaybooksComponent,
            data: {
              breadcrumb: 'Books'
            }
          },
          {
            path: ':id',
            component: DayBookComponent,
            data: {
              breadcrumb: 'Book'
            }
          },
          {
            path: ':id/logs/:date',
            component: DateLogsComponent,
            data: {
              breadcrumb: 'Logs'
            }
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayRoutingModule {}
