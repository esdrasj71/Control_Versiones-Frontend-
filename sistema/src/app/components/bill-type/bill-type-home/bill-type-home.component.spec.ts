import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTypeHomeComponent } from './bill-type-home.component';

describe('BillTypeHomeComponent', () => {
  let component: BillTypeHomeComponent;
  let fixture: ComponentFixture<BillTypeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTypeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTypeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
