import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsHomeComponent } from './costs-home.component';

describe('CostsHomeComponent', () => {
  let component: CostsHomeComponent;
  let fixture: ComponentFixture<CostsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
