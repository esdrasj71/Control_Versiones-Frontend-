import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesFormComponent } from './incomes-form.component';

describe('IncomesFormComponent', () => {
  let component: IncomesFormComponent;
  let fixture: ComponentFixture<IncomesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomesFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
