import { Component } from '@angular/core';

@Component({
  selector: 'flip-card-front',
  template: `
  <div class="flip-card-front">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class FlipCardFrontComponent { }