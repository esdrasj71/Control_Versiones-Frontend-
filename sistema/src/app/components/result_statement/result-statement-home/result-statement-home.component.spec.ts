import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultStatementHomeComponent } from './result-statement-home.component';

describe('ResultStatementHomeComponent', () => {
  let component: ResultStatementHomeComponent;
  let fixture: ComponentFixture<ResultStatementHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultStatementHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultStatementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
