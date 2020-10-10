import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPurchaseHomeComponent } from './payment-purchase-home.component';

describe('PaymentPurchaseHomeComponent', () => {
  let component: PaymentPurchaseHomeComponent;
  let fixture: ComponentFixture<PaymentPurchaseHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPurchaseHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPurchaseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
