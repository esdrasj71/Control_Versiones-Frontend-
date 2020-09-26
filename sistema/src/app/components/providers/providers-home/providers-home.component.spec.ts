import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersHomeComponent } from './providers-home.component';

describe('ProvidersHomeComponent', () => {
  let component: ProvidersHomeComponent;
  let fixture: ComponentFixture<ProvidersHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
