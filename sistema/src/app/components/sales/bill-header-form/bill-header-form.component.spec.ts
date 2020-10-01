import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillHeaderFormComponent } from './bill-header-form.component';

describe('BillHeaderFormComponent', () => {
  let component: BillHeaderFormComponent;
  let fixture: ComponentFixture<BillHeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillHeaderFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillHeaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
