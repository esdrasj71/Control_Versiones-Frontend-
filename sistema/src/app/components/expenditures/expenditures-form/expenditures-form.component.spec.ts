import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendituresFormComponent } from './expenditures-form.component';

describe('ExpendituresFormComponent', () => {
  let component: ExpendituresFormComponent;
  let fixture: ComponentFixture<ExpendituresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpendituresFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpendituresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
