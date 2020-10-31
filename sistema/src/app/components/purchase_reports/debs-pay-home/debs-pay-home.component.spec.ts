import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebsPayHomeComponent } from './debs-pay-home.component';

describe('DebsPayHomeComponent', () => {
  let component: DebsPayHomeComponent;
  let fixture: ComponentFixture<DebsPayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebsPayHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebsPayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
