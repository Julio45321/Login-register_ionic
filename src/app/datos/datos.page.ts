import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: any;

  barChart: any;
  valveState: boolean = false;
  latestData: any = {};
  container1: number = 0;
  container2: number = 0;

  constructor(private servicio: DatosService) {}

  ngOnInit() {
    //Obtenemos el valor que esta en la BBDD al iniciar
    this.servicio.getValveState().subscribe((res: boolean) => {
      this.valveState = res;
    });

    this.servicio.getPercentagesData().subscribe((res: any) => {
      const entries = Object.entries(res);

      //Obtenemos el ultimos dato registrado por el sensor
      this.latestData = entries[entries.length - 1];

      //Asignamos los datos
      this.container1 = this.latestData[1].contenedor1;
      this.container2 = this.latestData[1].contenedor2;
    });
  }

  ionViewDidEnter() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
        ],
        datasets: [
          {
            label: 'Ventas',
            data: [12, 19, 3, 5, 2, 3, 20],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }

  onClickSwitch(estado: boolean) {
    this.servicio.updateValveState(estado).subscribe((res: boolean) => {
      this.valveState = res;
    });
  }
}
