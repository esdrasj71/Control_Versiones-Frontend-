import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDetailHomeComponent } from './payment-detail-home.component';

describe('PaymentDetailHomeComponent', () => {
  let component: PaymentDetailHomeComponent;
  let fixture: ComponentFixture<PaymentDetailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDetailHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
