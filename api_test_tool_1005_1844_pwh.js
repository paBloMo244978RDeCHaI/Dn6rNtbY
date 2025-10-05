// 代码生成时间: 2025-10-05 18:44:45
 * It includes error handling and follows best practices for code maintainability and scalability.
 */

// Import necessary modules
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiTestToolService {
  // Base URL for the API
  private baseUrl: string = 'https://api.example.com';

  constructor(private http: HttpClient) {
  }

  /**
   * Sends a GET request to the specified API endpoint
   * @param endpoint API endpoint path
   * @returns Observable response or error
   */
  get(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sends a POST request to the specified API endpoint with data
   * @param endpoint API endpoint path
   * @param data Data to be sent in the request body
   * @returns Observable response or error
   */
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sends a PUT request to the specified API endpoint with data
   * @param endpoint API endpoint path
   * @param data Data to be sent in the request body
   * @returns Observable response or error
   */
  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Sends a DELETE request to the specified API endpoint
   * @param endpoint API endpoint path
   * @returns Observable response or error
   */
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors
   * @param error HttpErrorResponse
   * @returns Observable error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
