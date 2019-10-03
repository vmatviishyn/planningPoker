import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  daysArray = [
    { value: 0, text: '0' },
    { value: 0.5, text: '1/2' },
    { value: 1, text: '1' },
    { value: 2, text: '2' },
    { value: 3, text: '3' },
    { value: 4, text: '4' },
    { value: 5, text: '5' },
    { value: 8, text: '8' },
    { value: 13, text: '13' },
    { value: 20, text: '20' },
    { value: 40, text: '30' },
    { value: 100, text: '100' },
    { value: null, text: '?' },
    { value: null, text: 'Coffee' },
  ];
}
