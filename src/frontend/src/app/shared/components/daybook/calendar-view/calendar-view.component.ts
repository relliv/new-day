import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalConfig, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { IDaybook, Daybook } from '@data/models/daybook/daybook';
import { DaybookDateRootObject, IDaybookDate, DaybookDate} from '@data/models/daybook/daybook-date';
import { DaybookLogService } from '@data/graphql/daybook/daybook-log.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  @Input() monthNumber: number;
  @Input() daybook: IDaybook = new Daybook();
  @Input() selectedDay: any;
  @Output() dayLoadingChange = new EventEmitter<any>();
  @ViewChild('daybookLogsModal') daybookLogsModal: any;

  // #region Modal

  private modalReference: any;
  private closeResult: any;

  //#endregion

  //#region Daybook Date

  private daybookDateQuery: QueryRef < any > ;
  private daybookDateQuerySubscription: Subscription;

  public daybookDate: IDaybookDate = new DaybookDate();
  public daybookDateLoading: boolean;

  //#endregion

  public monthName: string;
  public days: any = [];
  public currentYear: number = 2021;
  public dayLog: any;

  public currentLoggingDay: any;

  public isSyncing: boolean = false;

  constructor(
    private daybookLogService: DaybookLogService,
    private apollo: Apollo,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit(): void {
    var now = moment(),
      monthDaysCount = moment(`${this.currentYear}-${this.monthNumber}`, 'Y-M').daysInMonth();

    var daysOfMonth = Array.from({length: monthDaysCount}, (x, i) => i + 1);

    this.days = daysOfMonth.map((i) => {
      let date = moment(`${this.currentYear}-${this.monthNumber}-${i}`),
        filledColorNumber: any,
        daybookDate;

      if (this.daybook.dates){
        daybookDate = this.daybook.dates.find(x => x.target_date == date.format('YYYY-MM-DD'));

        if (daybookDate){
          filledColorNumber = this.getLastNumberOf(daybookDate.created_at);
        }
      }

      return {
        number: i,
        isToday: date.format('YYYY-MM-DD') === now.format('YYYY-MM-DD') ? true : false,
        filledColorNumber: filledColorNumber ? filledColorNumber : false,
        date: date,
        month: this.monthNumber,
        year: this.currentYear,
        daybookDate: daybookDate,
        isLoading: false
      };
    });

    this.monthName = moment(this.monthNumber, 'M').format('MMMM');
  }

  public openDayLog(day: any){
    this.router.navigate(['day/books', this.daybook.id, 'logs', day.date.format('YYYY-MM-DD')]);
  }

  /**
   * Open target modal
   *
   * @param modal target modal
   */
  private openModal(modal: any) {
    this.modalReference = this.modalService.open(modal, {
      size: 'lg',
      centered: true
    });

    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getLastNumberOf(created_at: any){
    let lastNumber: any = created_at.split('').pop();

    return lastNumber ? lastNumber.charAt(lastNumber.length-1) : false;
  }

  /**
   * Get dismiss reason for modals
   *
   * @param reason dismiss reason
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  /**
   * Set dismiss and close reason for modals
   */
  private setDismissReason() {
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
