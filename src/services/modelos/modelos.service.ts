import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModelosService {
  constructor(private readonly http: HttpClient) {}

  obtenerDatos(tipo:string,codigo: string): Observable<any> {
    return this.http.get(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigo}/modelos`
    );
  }
}
