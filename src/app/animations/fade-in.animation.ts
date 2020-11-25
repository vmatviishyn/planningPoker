import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate(250, style({
      opacity: 1,
    }))
  ]),
]);
