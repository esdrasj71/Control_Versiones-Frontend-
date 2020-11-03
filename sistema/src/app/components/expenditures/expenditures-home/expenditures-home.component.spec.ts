import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpendituresHomeComponent } from './expenditures-home.component';

describe('ExpendituresHomeComponent', () => {
  let component: ExpendituresHomeComponent;
  let fixture: ComponentFixture<ExpendituresHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpendituresHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpendituresHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
