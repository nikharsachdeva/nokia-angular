import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Product } from './product';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ProductMain } from './productMain';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private REST_API_SERVER = "https://sitedetailstracker.herokuapp.com/getData/";
  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  public sendGetRequest(searchedValue : string){
    let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json');
   headers.append('Accept', 'application/json');
   headers.append('Access-Control-Allow-Origin', '*');

    return this.httpClient.get<ProductMain>(this.REST_API_SERVER+searchedValue,{ 'headers': headers }).pipe(retry(1), catchError(this.handleError));
  }
}
