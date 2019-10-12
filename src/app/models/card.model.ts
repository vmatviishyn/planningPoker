export interface Card {
  value: number;
  mainText: string;
  secondaryText: string;
}

export interface CardType {
  value: string;
}

// @TODO: Add more types
const izyan: Card[] = [
  {
    value: 1,
    mainText: 'изян',
    secondaryText: '1',
  },
  {
    value: 2,
    mainText: 'изи',
    secondaryText: '2',
  },
  {
    value: 4,
    mainText: 'просто',
    secondaryText: '4',
  },
  {
    value: 6,
    mainText: 'вроде просто',
    secondaryText: '6',
  },
  {
    value: 8,
    mainText: 'норм',
    secondaryText: '8',
  },
  {
    value: 12,
    mainText: 'норм так',
    secondaryText: '12',
  },
  {
    value: 16,
    mainText: 'хз',
    secondaryText: '16',
  },
  {
    value: 20,
    mainText: 'хз как-то',
    secondaryText: '20',
  },
  {
    value: 24,
    mainText: 'как-то сложно',
    secondaryText: '24',
  },
  {
    value: 30,
    mainText: 'сложно',
    secondaryText: '30',
  },
  {
    value: 40,
    mainText: 'очень сложно',
    secondaryText: '40',
  },
  {
    value: 48,
    mainText: 'бля',
    secondaryText: '48',
  },
  {
    value: 60,
    mainText: 'пиздец',
    secondaryText: '60',
  },
  {
    value: 80,
    mainText: 'пиздец какой-то',
    secondaryText: '80',
  },
  {
    value: 100,
    mainText: 'вроде изян',
    secondaryText: '100',
  },
];

const tshirt: Card[] = [
  {
    value: 1,
    mainText: 'XS',
    secondaryText: 'XS',
  },
  {
    value: 2,
    mainText: 'S',
    secondaryText: 'S',
  },
  {
    value: 3,
    mainText: 'M',
    secondaryText: 'M',
  },
  {
    value: 4,
    mainText: 'L',
    secondaryText: 'L',
  },
  {
    value: 5,
    mainText: 'XL',
    secondaryText: 'XL',
  },
  {
    value: 6,
    mainText: 'XXL',
    secondaryText: 'XXL',
  }
];

export const CardTypes = {
  izyan,
  tshirt
};
