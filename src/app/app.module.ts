import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule, combineReducers, provideStore } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { compose } from '@ngrx/core/compose';

import { storeFreeze } from 'ngrx-store-freeze';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from './app.component';
import { DeckTestComponent } from './deck-test/deck-test.component';
import { RulesComponent } from './rules/rules.component';
import { PointsComponent } from './points/points.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckTestComponent,
    RulesComponent,
    PointsComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    // Libraries
    //StoreModule.provideStore(rootReducer),
    //StoreDevtoolsModule.instrumentOnlyWithExtension(),
    NgbModule.forRoot(),
    // Routing
    AppRoutingModule,
    //RouterStoreModule.connectRouter()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
