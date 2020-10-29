import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebsToPayHomeComponent } from './debs-to-pay-home.component';

describe('DebsToPayHomeComponent', () => {
  let component: DebsToPayHomeComponent;
  let fixture: ComponentFixture<DebsToPayHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DebsToPayHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebsToPayHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
