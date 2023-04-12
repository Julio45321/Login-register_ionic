import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DatosService } from '../servicios/datos.service';

interface ItemDataBase {
  contenedor1: number;
  contenedor2: number;
}

@Component({
  selector: 'app-datos',
  templateUrl: './datos.page.html',
  styleUrls: ['./datos.page.scss'],
})
export class DatosPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: any;
  @ViewChild('pieCanvas', { static: true }) pieCanvas!: ElementRef;
  @ViewChild('pieCanvas2', { static: true }) pieCanvas2!: ElementRef;

  pieChart: any;
  pieChart2: any;

  barChart: any;
  valveState: boolean = false;
  textValve1: string = '';

  latestData: any = {};
  lastDateUpdated: any;

  container1: number = 0;
  container2: number = 0;
  registersContainer1: Array<number> = [];
  registersContainer2: Array<number> = [];

  constructor(private servicio: DatosService) {
    Chart.register(...registerables);
  }

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

      //Ultimos 7 registros para la grafica
      const latestRegisters = entries.slice(-7);

      //Quitamos el ID de cada registro
      const dataChartObjects = latestRegisters.map((item) => item[1]);

      //Asignamos los valores a sus arrays correspondientes
      dataChartObjects.map((item: any) => {
        this.registersContainer1.push(item.contenedor1);
        this.registersContainer2.push(item.contenedor2);
      });
    });

    //Ultima hora de actualizacion
    var today = new Date();
    var now = today.toLocaleString();
    this.lastDateUpdated = now;

    //Texto para la valvula
    this.textValve1 = this.valveState ? 'Abierto' : 'Cerrado';
  }

  onClickSwitch(estado: boolean) {
    this.servicio.updateValveState(estado).subscribe((res: boolean) => {
      this.valveState = res;
    });

    //Texto para la valvula
    this.textValve1 = this.valveState ? 'Abierto' : 'Cerrado';
  }

  //Grafica circular
  ionViewDidEnter() {
    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: [
          'Hace 7 registros',
          'Hace 6 registros',
          'Hace 5 registros',
          'Hace 4 registros',
          'Hace 3 registros',
          'Hace 2 registros',
          'Hace 1 registros',
        ],
        datasets: [
          {
            label: '% de llenado',
            data: this.registersContainer1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 152, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 152, 255, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    this.pieChart2 = new Chart(this.pieCanvas2.nativeElement, {
      type: 'pie',
      data: {
        labels: [
          'Hace 7 registros',
          'Hace 6 registros',
          'Hace 5 registros',
          'Hace 4 registros',
          'Hace 3 registros',
          'Hace 2 registros',
          'Hace 1 registros',
        ],
        datasets: [
          {
            label: '% de llenado',
            data: this.registersContainer2,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 152, 255, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 152, 255, 0.2)',
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
