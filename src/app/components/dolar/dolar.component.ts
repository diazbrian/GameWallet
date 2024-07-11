import { Component } from '@angular/core';
import { Dolar } from '../../interfaces/dolar';
import { DolarService } from '../../services/dolar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dolar',
  templateUrl: './dolar.component.html',
  styleUrl: './dolar.component.css'
})
export class DolarComponent {

  dolares: Dolar[] = [];

  constructor( private dolarService: DolarService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getDolares();
  }

  getDolares() {
    this.dolarService.getDolar().subscribe(data => {
      this.dolares = data.map(dolar => {
        return {
          ...dolar,
          fechaActualizacion: this.datePipe.transform(dolar.fechaActualizacion, 'dd/MM/yyyy')
        }
      });
    });
  }

}
