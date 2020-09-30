import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotHomeComponent } from './lot-home.component';

describe('LotHomeComponent', () => {
  let component: LotHomeComponent;
  let fixture: ComponentFixture<LotHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
