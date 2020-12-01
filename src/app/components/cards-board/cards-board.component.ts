import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Card, CardTypes, SELECTED_CARD_TYPE } from 'src/app/models';

@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsBoardComponent implements OnChanges {
  @Input() type: string;
  @Input() selected: Card;
  @Output() cardClicked = new EventEmitter();

  cards: Card[];

  ngOnChanges() {
    this.cards = CardTypes[this.type || SELECTED_CARD_TYPE];
  }

  onCardClick(card: Card) {
    this.cardClicked.emit(card);
  }

}
