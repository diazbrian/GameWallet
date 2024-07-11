import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlipCardFrontComponent } from './flip-card-front';
import { FlipCardBackComponent } from './flip-card-back';

@NgModule({
  declarations: [
    DashboardComponent, 
    FlipCardFrontComponent, 
    FlipCardBackComponent],
  imports: [
    CommonModule
  ],
  exports: [DashboardComponent, FlipCardFrontComponent, FlipCardBackComponent]
})
export class DashboardModule { }