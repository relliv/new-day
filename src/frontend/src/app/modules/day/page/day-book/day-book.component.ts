import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, ParamMap, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

import { Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { DaybookRootObject, IDaybook, Daybook } from '@data/models/daybook/daybook';
import { DaybookService } from '@data/graphql/daybook/daybook.service';

@Component({
  selector: 'app-day-book',
  templateUrl: './day-book.component.html',
  styleUrls: ['./day-book.component.scss']
})
export class DayBookComponent implements OnInit, OnDestroy {
  //#region Daybooks

  private daybookQuery: QueryRef < any > ;
  private daybookQuerySubscription: Subscription;
  public daybook: IDaybook = new Daybook();
  public daybookLoading: boolean = true;

  //#endregion

  public daybookId: any;

  public months = [1,2,3,4,5,6,7,8,9,10,11,12];
  public selectedDay: any;

  constructor(
    private route: ActivatedRoute,
    private daybookService: DaybookService,
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let daybookId = params.get('id');

      if (daybookId){
        this.daybookId = daybookId;

        this.daybookQuery = this.apollo.watchQuery < DaybookRootObject > ({
          query: this.daybookService.getBook(daybookId)
        });
      } else {
        // Tood: nofity about missing some things
      }
    });
  }

  ngOnInit(): void {
    this.spinner.show('monthsLoading');

    this.daybookQuerySubscription = this.daybookQuery
    .valueChanges
    .subscribe(({
      data,
      loading
    }) => {
      this.daybook = data.daybook;
      this.daybookLoading = loading;
    });
  }

  public setStateToMonths(day: any): void{
    this.selectedDay = day;
  }

  public onFocusDaybookTitle(index: number, dateLog: any){
    dateLog.isEditing = true;

    // setTimeout(() => {
    //   this.editTitleInputs.toArray()[0].nativeElement.focus();
    // }, 250);
  }

  ngOnDestroy() {
    this.daybookQuerySubscription.unsubscribe();
  }
}
