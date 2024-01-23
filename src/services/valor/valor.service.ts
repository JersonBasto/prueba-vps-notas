import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ValorService {
  constructor(private readonly http: HttpClient) {}

  obtenerDatos(
    tipo: string,
    codigoMarca: string,
    codigoModelo: string,
    codigoAño: string
  ): Observable<any> {
    return this.http.get(
      `https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${codigoMarca}/modelos/${codigoModelo}/anos/${codigoAño}`
    );
  }
}
