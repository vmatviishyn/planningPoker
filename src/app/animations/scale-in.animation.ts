import { animate, style, transition, trigger } from '@angular/animations';

export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0)',
    }),
    animate(250, style({
      opacity: 1,
      transform: 'scale(1)',
    }))
  ]),
]);
