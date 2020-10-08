import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPurchaseFormComponent } from './payment-purchase-form.component';

describe('PaymentPurchaseFormComponent', () => {
  let component: PaymentPurchaseFormComponent;
  let fixture: ComponentFixture<PaymentPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPurchaseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
