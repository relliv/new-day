import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();
  @Input() itemRoute: any;
  @Input() itemTitle: any;
  @Input() topTitle: any;
  @Input() mainTitle: any;
  @Input() description: any;
  @Input() buttonText: any;

  constructor() { }

  ngOnInit(): void {
  }

}
