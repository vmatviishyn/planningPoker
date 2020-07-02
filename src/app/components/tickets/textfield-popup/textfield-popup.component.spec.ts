import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextfieldPopupComponent } from './textfield-popup.component';

describe('TextfieldPopupComponent', () => {
  let component: TextfieldPopupComponent;
  let fixture: ComponentFixture<TextfieldPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextfieldPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextfieldPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
