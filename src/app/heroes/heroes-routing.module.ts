import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const heroesRoutes: Routes = [
  { path: 'heroes', component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }