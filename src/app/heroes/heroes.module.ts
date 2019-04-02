import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    HeroListComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    DashboardComponent,
    HeroesComponent
  ]
})
export class HeroesModule { }