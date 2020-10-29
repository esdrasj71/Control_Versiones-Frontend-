import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReportsHomeComponent } from './inventory-reports-home.component';

describe('InventoryReportsHomeComponent', () => {
  let component: InventoryReportsHomeComponent;
  let fixture: ComponentFixture<InventoryReportsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReportsHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryReportsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
