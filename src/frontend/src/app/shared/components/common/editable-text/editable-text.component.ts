import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})

export class EditableTextComponent implements OnInit {
  @ViewChildren('replaceInput') replaceInput: QueryList < ElementRef > ;

  @Output() onFocus = new EventEmitter < any > ();
  @Output() onBlur = new EventEmitter < any > ();

  @Input() textContent: any;
  @Input() text: any;
  @Input() inputDisabled: boolean;
  @Input() isEditing: boolean;

  private previousText = null;

  constructor() {}

  public onFocused(event: any) {
    this.isEditing = true;

    setTimeout(() => {
      this.replaceInput.toArray()[0].nativeElement.focus();

      this.onFocus.emit();
    }, 250);
  }

  public onBlured(event: any) {
    if (!this.previousText || this.text === event.target.value) {
      this.isEditing = false;

      return;
    }

    this.previousText = event.target.value;
    this.onBlur.emit();
  }

  ngOnInit(): void {}
}
