import { Component, Input, OnChanges } from '@angular/core';

import { Card, CardTypes } from 'src/app/models';

@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.less']
})
export class CardsBoardComponent implements OnChanges {
  @Input() type: string;

  cards: Card[];
  selected: Card;

  ngOnChanges() {
    this.cards = CardTypes[this.type || 'izyan'];
  }

  onCardClick(card: Card) {
    this.selected = card;
    console.log('Card', card.value);
  }

}
