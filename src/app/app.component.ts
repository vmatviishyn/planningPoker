import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  members = [
    {
      name: 'Vitalii',
    },
    {
      name: 'Taras',
    },
    {
      name: 'Andriyy',
    },
    {
      name: 'Mike',
    },
    {
      name: 'Maks',
    },
    {
      name: 'Maksym',
    },
  ];

}
