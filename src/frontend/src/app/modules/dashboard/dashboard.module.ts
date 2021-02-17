import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { DashboardComponent } from './page/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    // MaterialModule,
    SharedModule,
    DashboardRoutingModule,
    // FontAwesomeModule,

  ],
  exports:[
  ],
  providers: [

  ]
})
export class DashboardModule {}
