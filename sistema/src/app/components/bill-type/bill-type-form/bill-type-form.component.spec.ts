import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillTypeFormComponent } from './bill-type-form.component';

describe('BillTypeFormComponent', () => {
  let component: BillTypeFormComponent;
  let fixture: ComponentFixture<BillTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
