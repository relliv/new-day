import { Component, OnInit } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map, distinctUntilChanged, timeInterval, timeout } from "rxjs/operators";
import moment, { Moment } from "moment";

@Component({
  selector: 'app-live-datetime',
  templateUrl: './live-datetime.component.html',
  styleUrls: ['./live-datetime.component.scss']
})
export class LiveDatetimeComponent implements OnInit {
  public time: any;

  constructor() {}

  ngOnInit() {
    const seconds = interval(1000 * 10);

    seconds.pipe(timeInterval())
    .subscribe(
        value => this.time = moment().format('HH:mm'),
        err => console.log(err),
    );
  }
}
