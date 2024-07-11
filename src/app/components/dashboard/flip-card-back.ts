import { Component } from '@angular/core';

@Component({
  selector: 'flip-card-back',
  template: `
   <div class="flip-card-back">
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class FlipCardBackComponent { }