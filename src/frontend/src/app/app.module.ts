import { AuthGuard } from '@app/guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { GraphQLModule } from './graphql.module';

//import moment from 'moment';
import * as moment from 'moment-timezone';

import { MomentModule } from 'ngx-moment';
// import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '@shared/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from '@layout/nav/nav.component';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { defaultTimeZone, currentTimeZone } from '@data/models/common/preferences.ts';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,

    // AuthModule,
    // CoreModule,
    MaterialModule,
    ToastrModule.forRoot(),
    MomentModule,
    // SharedModule,
    // NgxSpinnerModule,

    // Required by the Angular Material icon module
    HttpClientModule,
    //MatIconModule,
  ],
  exports:[

  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    // timezone list: https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
    // moment.tz.setDefault(defaultTimeZone);
    // moment.tz.setDefault(currentTimeZone);

    moment.locale('en-us');

    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}
