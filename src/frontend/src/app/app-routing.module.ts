import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/guard/auth.guard';
import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   canActivate: [NoAuthGuard],
  //   loadChildren: () => import('@modules/auth/auth.module').then(m => m.AuthModule)
  // },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'day',
        loadChildren: () =>
          import('@modules/day/day.module').then(m => m.DayModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
