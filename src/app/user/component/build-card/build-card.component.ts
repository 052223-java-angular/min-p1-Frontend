import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-build-card',
  templateUrl: './build-card.component.html',
  styleUrls: ['./build-card.component.css']
})
export class BuildCardComponent {
  dex: string = '1';
  @Input() builds: any;
}
