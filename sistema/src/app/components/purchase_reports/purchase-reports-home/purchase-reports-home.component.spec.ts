import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReportsHomeComponent } from './purchase-reports-home.component';

describe('PurchaseReportsHomeComponent', () => {
  let component: PurchaseReportsHomeComponent;
  let fixture: ComponentFixture<PurchaseReportsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReportsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReportsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
