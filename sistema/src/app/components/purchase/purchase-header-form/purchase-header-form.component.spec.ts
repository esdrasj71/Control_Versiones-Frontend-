import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHeaderFormComponent } from './purchase-header-form.component';

describe('PurchaseHeaderFormComponent', () => {
  let component: PurchaseHeaderFormComponent;
  let fixture: ComponentFixture<PurchaseHeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseHeaderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseHeaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
