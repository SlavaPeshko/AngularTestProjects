import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroService: HeroService
  ) {}

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get("id");
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
  }

  goBack(): void {
    this.router.navigate(["/heroes", { id: this.hero.id }]);;
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
