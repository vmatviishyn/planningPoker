import { Component, OnInit, Input } from '@angular/core';

import { Card, CardTypes } from 'src/app/models';

@Component({
  selector: 'app-cards-board',
  templateUrl: './cards-board.component.html',
  styleUrls: ['./cards-board.component.less']
})
export class CardsBoardComponent implements OnInit {
  @Input() type: string;

  cards: Card[];
  selected: Card;

  constructor() { }

  ngOnInit() {
  }

  // @TODO: Replace with stream
  getCardTypes() {
    return CardTypes[this.type || 'izyan'];
  }

  onCardClick(card: Card) {
    this.selected = card;
    console.log('Card', card.value);
  }

}
