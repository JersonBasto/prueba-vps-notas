import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  apiKey: string = 'cur_live_EhMSQKrQ58CbCzbqdB23XAR075TnqiZyPHvGfSqI';

  constructor(private readonly http: HttpClient) {}

  obtenerCurrency(): Observable<any> {
    const url =
      'https://api.currencyapi.com/v3/latest?apikey=cur_live_EhMSQKrQ58CbCzbqdB23XAR075TnqiZyPHvGfSqI';
    return this.http.get(url);
  }
}
