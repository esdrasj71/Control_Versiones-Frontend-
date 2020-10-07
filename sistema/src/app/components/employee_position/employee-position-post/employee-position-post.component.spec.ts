import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePositionPostComponent } from './employee-position-post.component';

describe('EmployeePositionPostComponent', () => {
  let component: EmployeePositionPostComponent;
  let fixture: ComponentFixture<EmployeePositionPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePositionPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePositionPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
