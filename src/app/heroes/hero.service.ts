import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Hero } from './hero';
import { MessagesService } from '../messages/messages.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService
  ) {}

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number | string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hewHero: Hero) => this.log(`Add new hero id = ${hewHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching '${term}'`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated entity`)),
      catchError(this.handleError<Hero>('update', hero))
    );
  }

  updateEntity<T>(entity: T): Observable<T> {
    return this.http.put<T>(this.heroesUrl, entity, httpOptions).pipe(
      tap(_ => this.log(`updated entity`)),
      catchError(this.handleError<T>('update', entity))
    );
  }

  deleteHero(id: number): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
        tap(_ => this.log(`delete hero id = ${id}`)),
        catchError(this.handleError('deleteHero'))
      );
  }

  private log(message: string) {
    // debugger;
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}