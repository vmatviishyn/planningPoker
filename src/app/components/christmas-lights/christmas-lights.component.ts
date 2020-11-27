import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-christmas-lights',
  templateUrl: './christmas-lights.component.html',
  styleUrls: ['./christmas-lights.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChristmasLightsComponent {
  constructor() { }
}
