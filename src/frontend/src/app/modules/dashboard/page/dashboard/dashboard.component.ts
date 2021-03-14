import { Component, OnInit, ChangeDetectionStrategy, NgZone, ChangeDetectorRef, ViewRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Apollo, QueryRef } from 'apollo-angular';
import { DaybookService } from '@data/graphql/daybook/daybook.service';
import { DaybooksRootObject, Daybooks } from '@data/models/daybook/daybook';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  @ViewChild('addDaybookModal') addDaybookModalRef: any;

  //#region Daybooks

  private daybooksQuery: QueryRef < any > ;
  private daybooksQuerySubscription: Subscription;
  public daybooks: any;
  public daybooksLoading: boolean;

  //#endregion

  //#region Form

  public newDaybookForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    description: new FormControl(''),
  });

  public newDaybookAdding: boolean;

  //#endregion

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modalService: NgbModal,
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
    this.loadDaybooks();
  }

  public loadDaybooks(){
    this.daybooksLoading = true;
    this.spinner.show(`dataSpinner`);

    this.daybooksQuerySubscription = this.daybooksQuery
    .valueChanges
    .subscribe(({
      data,
      loading
    }) => {
      this.daybooks = data.daybooks.data;
      this.daybooksLoading = loading;

      this.spinner.hide(`dataSpinner`);

      this.refreshUi();
    });
  }

  public openModal() {
    this.modalService.open(this.addDaybookModalRef, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true
    });
  }

  public addDaybook(){
    console.log(this.newDaybookForm.value);
    this.newDaybookAdding = true;

    this.apollo.mutate({
      mutation: this.daybookService.createDaybook(this.newDaybookForm.value.title, this.newDaybookForm.value.description),
      update: (proxy, data: any ) => {
        // Read the data from our cache for this query.
        const _data: any = proxy.readQuery({ query: this.daybookService.getBooks() });

        // If you are using the Query service (TodoAppGQL) instead of defining your GQL as a constant, you can reference the query as:
        // const data = proxy.readQuery({ query: this.todoAppGQL.document });

        console.log(_data.daybooks.data, data.createDaybook);
        // Add our todo from the mutation to the end.
        _data.daybooks.data.push(data);

        // Write our data back to the cache.
        proxy.writeQuery({ query: this.daybookService.getBooks(), data });

        // alternatively when using Query service:
        // proxy.writeQuery({ query: this.todoAppGQL.document, data });

        this.newDaybookAdding = false;
      }
    }).subscribe();
  }

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
