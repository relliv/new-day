import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveDatetimeComponent } from './live-datetime.component';

describe('LiveDatetimeComponent', () => {
  let component: LiveDatetimeComponent;
  let fixture: ComponentFixture<LiveDatetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveDatetimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
