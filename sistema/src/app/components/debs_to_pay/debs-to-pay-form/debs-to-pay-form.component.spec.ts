import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebsToPayFormComponent } from './debs-to-pay-form.component';

describe('DebsToPayFormComponent', () => {
  let component: DebsToPayFormComponent;
  let fixture: ComponentFixture<DebsToPayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebsToPayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebsToPayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
