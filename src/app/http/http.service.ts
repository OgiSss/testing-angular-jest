import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public getGETData(): Observable<{ someValue: string }> {
    return this.httpClient.get<{ someValue: string }>('someUrl').pipe(
      tap(() => console.log('Error')),
      catchError(this.handleError('Failed'))
    );
  }

  public getPOSTData(data: any) {
    return this.httpClient.post('someUrl', { data });
  }

  private handleError(operation: string) {
    return (error: HttpErrorResponse) => {
      throw new Error(`${operation} operation and error`);
    };
  }
}
