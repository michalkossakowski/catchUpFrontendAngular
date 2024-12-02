import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import { loginRequest } from '../Dtos/loginRequest.dto';
import { loginResponse } from '../Dtos/loginResponse.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import {UserService} from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isRefreshing = false;
    private apiUrl = 'https://localhost:7097/api/Auth/';
    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    // login method for testing
    login(email: string, password: string): Observable<boolean> {
        const loginRequest: loginRequest = { email, password };

        return this.http.post<loginResponse>(`${this.apiUrl}Login`, loginRequest).pipe(
            map(response => {
                localStorage.setItem('accessToken', response.accessToken);
                localStorage.setItem('refreshToken', response.refreshToken);

                const userId = this.extractUserIdFromToken(response.accessToken);
                if (userId) {
                    this.userService.getById(userId).subscribe({
                        next: (user) => {
                            localStorage.setItem('user', JSON.stringify(user));
                        },
                        error: (error) => {
                            console.error('Error fetching user', error);
                        }
                    });
                }

                this.isLoggedInSubject.next(true);
                return true;
            }),
            catchError(error => {
                console.error('Login failed', error);
                this.isLoggedInSubject.next(false);
                return of(false);
            })
        );
    }

    // Method to extract user ID from JWT token
    extractUserIdFromToken(token: string): string | null {
        try {
            const decodedToken: any = jwtDecode(token);
            return decodedToken.nameid;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    // Check if user is logged in
    checkLoginStatus(): boolean {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (!accessToken) {
            this.clearTokens();
            return false;
        }

        try {
            const decodedAccessToken: any = jwtDecode(accessToken);
            const isAccessTokenExpired = decodedAccessToken.exp * 1000 < Date.now();

            if (isAccessTokenExpired) {
                if (!refreshToken) {
                    this.clearTokens();
                    return false;
                }

                const decodedRefreshToken: any = jwtDecode(refreshToken);
                const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 < Date.now();

                if (isRefreshTokenExpired) {
                    this.clearTokens();
                    return false;
                }

                this.refreshTokens();
                return true;
            }

            // Access token is valid
            this.isLoggedInSubject.next(true);
            return true;
        } catch (error) {
            this.clearTokens();
            return false;
        }
    }

    refreshTokens(): Observable<any> {
        // Prevent multiple refresh attempts at the same time
        if (this.isRefreshing) {
            return new Observable();
        }

        this.isRefreshing = true;
        const refreshToken = localStorage.getItem('refreshToken');

        return new Observable(observer => {
            this.http.post('https://localhost:7097/api/Auth/Refresh', { refreshToken }, {
                headers: { 'Content-Type': 'application/json' }
            }).subscribe({
                next: (response: any) => {
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

                    localStorage.setItem('accessToken', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    this.isLoggedInSubject.next(true);
                    this.isRefreshing = false;

                    observer.next(response);
                    observer.complete();
                },
                error: (error) => {
                    this.clearTokens();
                    this.isRefreshing = false;
                    observer.error(error);
                }
            });
        });
    }

    private clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.isLoggedInSubject.next(false);
    }

}
