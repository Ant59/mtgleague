import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { RulesComponent } from "./rules/rules.component";
import { DeckTestComponent } from "./deck-test/deck-test.component";
import { PointsComponent } from "./points/points.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: RulesComponent },
      { path: 'deck-test', component: DeckTestComponent },
      { path: 'points', component: PointsComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
