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

  constructor(private servicio: DatosService) {}

  ngOnInit() {
    //Obtenemos el valor que esta en la BBDD al iniciar
    this.servicio.getValveState().subscribe((res: boolean) => {
      this.valveState = res;
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
