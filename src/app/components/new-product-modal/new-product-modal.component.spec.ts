import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductModalComponent } from './new-product-modal.component';

describe('NewProductModalComponent', () => {
  let component: NewProductModalComponent;
  let fixture: ComponentFixture<NewProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
