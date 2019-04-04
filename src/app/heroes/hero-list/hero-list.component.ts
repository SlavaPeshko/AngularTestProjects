import { Component, OnInit } from '@angular/core';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-hero-list",
  templateUrl: "./hero-list.component.html",
  styleUrls: ["./hero-list.component.css"]
})
export class HeroListComponent implements OnInit {
  heroes: Hero[];
  selectedId: number;

  constructor(
    private heroService: HeroService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.selectedId = params["id"] != undefined ? +params["id"] : -1;
    });
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  delete(id: number): void {
    this.heroes = this.heroes.filter(h => h.id != id);
    this.heroService.deleteHero(id).subscribe();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero)
      });
  }

  isSelected(hero: Hero): boolean {
    const select = hero.id === this.selectedId;
    return select;
  }
}