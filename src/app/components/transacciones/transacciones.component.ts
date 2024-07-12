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
  recargasTotalMonto: number = 0;
  recargasCantidad: number = 0;
  transaccionesCantidad: number = 0;
  descuentoCantidad: number = 0;
  descuentoTotalMonto: number = 0;

  constructor(private transaccionService: TransaccionService) { }

  ngOnInit(): void {
    this.getTransaccionesPorTarjeta();
    this.getRecargas();
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

  getRecargas(): void {
    this.transaccionService.getTransacciones().subscribe(data => {
      // Contar el total de recargas en las transacciones
      const recargasTotales = data.filter(transaccion => transaccion.tipo === 'recarga').length;
      this.recargasCantidad = recargasTotales;

      // Calcular el monto total de las recargas en las transacciones
      this.recargasTotalMonto = data
        .filter(transaccion => transaccion.tipo === 'recarga')
        .reduce((acc, transaccion) => acc + transaccion.monto, 0);

      this.transaccionesCantidad = data.length;

      this.descuentoCantidad = data.filter(transaccion => transaccion.tipo === 'gasto').length;

      this.descuentoTotalMonto = data
        .filter(transaccion => transaccion.tipo === 'gasto')
        .reduce((acc, transaccion) => acc + transaccion.monto, 0);

    })
  }
}
