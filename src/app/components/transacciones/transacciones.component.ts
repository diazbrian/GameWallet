import { Component, OnInit } from '@angular/core';
import { TransaccionService, Transaccion } from '../../services/transaccion.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  transacciones: Transaccion[] = [];
  cardNumber: number = 0; // Ejemplo de card_number, puedes ajustarlo según necesites

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.getTransaccionesPorTarjeta();
  }

  getTransaccionesPorTarjeta(): void {
    if (this.cardNumber) {
      this.transaccionService.getTransaccionesPorTarjeta(this.cardNumber)
        .subscribe((data: Transaccion[]) => {
          this.transacciones = data;
        });
    }
  }

  onCardNumberChange(newCardNumber: string): void {
    const cardNumber = Number(newCardNumber); // Convertir a número
    if (!isNaN(cardNumber)) {
      this.cardNumber = cardNumber;
      this.getTransaccionesPorTarjeta();
    }
  }
}
