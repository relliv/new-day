import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef, ViewRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Apollo, QueryRef } from 'apollo-angular';
import { DaybookService } from '@data/graphql/daybook/daybook.service';
import { DaybooksRootObject, Daybooks } from '@data/models/daybook/daybook';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  //#region Daybooks

  private daybooksQuery: QueryRef < any > ;
  private daybooksQuerySubscription: Subscription;
  public daybooks: Daybooks;
  public daybooksLoading: boolean;

  //#endregion

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private apollo: Apollo,
    private daybookService: DaybookService
  ) {
    this.daybooksQuery = this.apollo.watchQuery < DaybooksRootObject > ({
      query: this.daybookService.getBooks()
    });
  }

  ngOnInit(): void {
    this.daybooksQuerySubscription = this.daybooksQuery
    .valueChanges
    .subscribe(({
      data,
      loading
    }) => {
      this.daybooks = data.daybooks;
      this.daybooksLoading = loading;
    });
  }


  /**
   * get mind maps
   */
  public getMaps(): void {}

  /**
   * Update UI elements
   */
  private refreshUi(): void {
    if (!(this.changeDetectorRef as ViewRef).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy() {
    this.daybooksQuerySubscription.unsubscribe();
  }
}
