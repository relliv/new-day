import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateLogsComponent } from './date-logs.component';

describe('DateLogsComponent', () => {
  let component: DateLogsComponent;
  let fixture: ComponentFixture<DateLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
