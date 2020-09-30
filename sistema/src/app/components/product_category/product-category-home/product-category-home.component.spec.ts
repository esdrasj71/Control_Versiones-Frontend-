import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryHomeComponent } from './product-category-home.component';

describe('ProductCategoryHomeComponent', () => {
  let component: ProductCategoryHomeComponent;
  let fixture: ComponentFixture<ProductCategoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
