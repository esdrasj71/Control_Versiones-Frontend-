import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePositionHomeComponent } from './employee-position-home.component';

describe('EmployeePositionHomeComponent', () => {
  let component: EmployeePositionHomeComponent;
  let fixture: ComponentFixture<EmployeePositionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePositionHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePositionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
