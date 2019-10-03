import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsBoardComponent } from './cards-board.component';

describe('CardsBoardComponent', () => {
  let component: CardsBoardComponent;
  let fixture: ComponentFixture<CardsBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
