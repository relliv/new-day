import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateLogsComponent } from './page/date-logs/date-logs.component';
import { DayBookComponent } from './page/day-book/day-book.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: {
        title: 'Day'
      }
    },
    children: [
      {
        path: 'book',
        data: {
          breadcrumb: {
            title: 'Daybooks'
          }
        },
        children: [
          {
            path: ':id',
            component: DayBookComponent,
            data: {
              breadcrumb: {
                title: 'Daybook'
              }
            }
          },
          {
            path: ':id/logs/:date',
            component: DateLogsComponent,
            data: {
              breadcrumb: {
                title: 'Daybook Date'
              }
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
