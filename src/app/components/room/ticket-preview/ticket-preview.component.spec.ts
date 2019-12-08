import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPreviewComponent } from './ticket-preview.component';

describe('TicketPreviewComponent', () => {
  let component: TicketPreviewComponent;
  let fixture: ComponentFixture<TicketPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
