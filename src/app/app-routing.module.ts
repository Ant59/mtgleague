import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { DeckTestComponent } from "./deck-test/deck-test.component";
import { PointsComponent } from "./points/points.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'deck-test', component: DeckTestComponent },
      { path: 'points', component: PointsComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
