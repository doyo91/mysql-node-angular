import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserResponse, User } from '@shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        }),

        catchError((err) => this.handleError(err))
      );
  }

  logout(): void {
    // TODO: create method logout in API
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired);

    isExpired ? this.logout() : this.loggedIn.next(true);

    // TODO: set userIsLogged = isExpired
  }

  private saveToken(token: string): void {
    token.length > 10 && localStorage.setItem('token', token);
  }

  private handleError(err): Observable<never> {
    let errorMessage = 'An error ocurred retirenving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
