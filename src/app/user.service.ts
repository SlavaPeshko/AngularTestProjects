import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { User } from "../app/user/user.model";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private usersUrl = 'https://jsonplaceholder.typicode.com/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        const res = this.http.get<User[]>(this.usersUrl);
        return this.http.get<User[]>(this.usersUrl);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${this.usersUrl}/${id}`);
    }
}