import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarcasService {
  url: string;
  constructor(private readonly http: HttpClient) {
    this.url = '';
  }

  obtenerDatos(tipo: String): Observable<any> {
    this.url = `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`;
    return this.http.get<any>(this.url);
  }
}
