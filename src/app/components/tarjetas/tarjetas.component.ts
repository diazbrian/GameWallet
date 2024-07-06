import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../interfaces/tarjeta';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css'
})
export class TarjetasComponent {
  tarjetas: Tarjeta[] = [];
  saldo: number = 0;
  cardNumber: number = 0;
  idTarjeta: number = 0;
  cantidad: number = 500;

  constructor(private tarjetaService: TarjetaService) {}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(): void {
    this.tarjetaService.getTarjetas().subscribe(data => {
      this.tarjetas = data;
    });
  }

  crearTarjeta(): void {
    this.tarjetaService.createTarjeta(this.saldo, this.cardNumber).subscribe(response => {
      console.log('Tarjeta creada:', response);
      this.obtenerTarjetas();
    });
  }
  
  descontarSaldo(): void {
    this.tarjetaService.descontarSaldo(this.idTarjeta, this.cantidad).subscribe(response => {
      console.log('Saldo descontado:', response);
      this.obtenerTarjetas();
    });
  }
  recargarSaldo(): void {
    this.tarjetaService.recargarSaldo(this.idTarjeta, this.cantidad).subscribe(response => {
      console.log('Saldo recargado:', response);
      this.obtenerTarjetas();
    });
  }

  mostrarAlerta() {
    Swal.fire('¡Hola Mundo!', 'Este es un mensaje de ejemplo', 'success');
  }


}
