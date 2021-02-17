import { Component, OnInit, Input } from '@angular/core';
import { Daybook } from '@data/models/daybook/daybook';

@Component({
  selector: 'app-daybook-card',
  templateUrl: './daybook-card.component.html',
  styleUrls: ['./daybook-card.component.scss']
})
export class DaybookCardComponent implements OnInit {
  @Input() daybook: Daybook;

  constructor() { }

  ngOnInit(): void {
  }
}
