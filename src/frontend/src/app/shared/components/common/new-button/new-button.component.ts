import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewRef } from '@angular/core';

@Component({
  selector: 'app-new-button',
  templateUrl: './new-button.component.html',
  styleUrls: ['./new-button.component.scss']
})
export class NewButtonComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<any>();

  @Input() text: any;
  @Input() disabled: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshUi();
  }

  /**
   * Update UI elements
   */
  private refreshUi(): void {
    if (!(this.changeDetectorRef as ViewRef).destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }
}
