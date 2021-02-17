import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaybookCardComponent } from './daybook-card.component';

describe('DaybookCardComponent', () => {
  let component: DaybookCardComponent;
  let fixture: ComponentFixture<DaybookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaybookCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaybookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
