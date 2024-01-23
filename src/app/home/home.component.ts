import { Component, HostBinding } from '@angular/core';
import { MarcasService } from '../../services/marcas/marcas.service';
import { ModelosService } from '../../services/modelos/modelos.service';
import { AñosService } from '../../services/años/años.service';
import { ValorService } from '../../services/valor/valor.service';
import { CurrencyApiService } from '../../services/currency/currency-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  opciones: string[] = ['Moto', 'Carro', 'Camion'];
  seleccion: string = '';
  tipo: string = '';
  marcas: any;
  modelos: any;
  annos: any;
  marca: string = '';
  codigoMarca: string = '';
  codigoModelo: string = '';
  codigoAnno: string = '';
  valorVehiculo: number = 0;
  valorVehiculoCOP: number = 0;
  dataVehiculo: any;
  impuesto: number = 0;
  constructor(
    private readonly marcasService: MarcasService,
    private readonly modelosService: ModelosService,
    private readonly añosService: AñosService,
    private readonly valorService: ValorService,
    private readonly currencyApi: CurrencyApiService
  ) {
    this.marcas = [];
    this.modelos = [];
    this.annos = [];
  }

  onOpcionSeleccionada() {
    if (this.seleccion === 'Moto') {
      this.tipo = 'motos';
    } else if (this.seleccion === 'Carro') {
      this.tipo = 'carros';
    } else if (this.seleccion === 'Camion') {
      this.tipo = 'caminhoes';
    }
    this.marcasService.obtenerDatos(this.tipo).subscribe({
      next: (data) => {
        this.marcas = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  marcaSeleccionada() {
    console.log(this.marca);
    this.modelosService.obtenerDatos(this.tipo, this.codigoMarca).subscribe({
      next: (data) => {
        this.modelos = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Complete');
      },
    });
  }

  codigoModeloSeleccionado() {
    this.añosService
      .obtenerDatos(this.tipo, this.codigoMarca, this.codigoModelo)
      .subscribe({
        next: (data) => {
          this.annos = data;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Complete');
        },
      });
  }
  codigoAnnoSeleccionado() {
    this.valorService
      .obtenerDatos(
        this.tipo,
        this.codigoMarca,
        this.codigoModelo,
        this.codigoAnno
      )
      .subscribe({
        next: (data) => {
          this.dataVehiculo = data;
          if (this.dataVehiculo.Combustivel === 'Gasolina') {
            this.impuesto = 0.05;
          } else if (this.dataVehiculo.Combustivel === 'Diesel') {
            this.impuesto = 0.025;
          } else {
            this.impuesto = 0.01;
          }
          this.valorVehiculo =
            parseInt(this.dataVehiculo.Valor.replace(/[^\d]/g, '')) / 100;
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('Complete'),
      });
  }
  convertirCOP() {
    this.currencyApi.obtenerCurrency().subscribe({
      next: (data) => {
        this.valorVehiculoCOP =
          (data.data.COP.value / data.data.BRL.value) * this.valorVehiculo;
      },
    });
  }
  limpiar() {
    this.seleccion = '';
    this.codigoMarca = '';
    this.codigoModelo = '';
    this.codigoAnno = '';
    this.dataVehiculo = '';
    this.valorVehiculo = 0;
    this.valorVehiculoCOP = 0;
    this.marcas = [];
    this.modelos = [];
    this.annos = [];
  }
}
