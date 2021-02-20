import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MomentModule} from 'ngx-moment';
import { DaybookCardComponent } from '@shared/components/daybook/daybook-card/daybook-card.component';
import { BreadcrumbComponent } from '@shared/components/common/breadcrumb/breadcrumb.component';
import { LiveDatetimeComponent } from '@shared/components/common/live-datetime/live-datetime.component';
import { MatIconModule } from '@angular/material/icon';
import { NewButtonComponent } from './components/common/new-button/new-button.component';

@NgModule({
  declarations: [
    DaybookCardComponent,
    LiveDatetimeComponent,
    NewButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MatIconModule,
    MaterialModule,
    MomentModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MomentModule,
    MatIconModule,
    // custom components
    DaybookCardComponent,
    LiveDatetimeComponent,
    NewButtonComponent
  ]
})
export class SharedModule {}
