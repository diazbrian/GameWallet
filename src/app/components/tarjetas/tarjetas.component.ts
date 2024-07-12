import { Component } from '@angular/core';
import { TarjetaService } from '../../services/tarjeta.service';
import { Tarjeta } from '../../interfaces/tarjeta';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrl: './tarjetas.component.css',
  providers: [DatePipe]
})
export class TarjetasComponent {
  tarjetas: Tarjeta[] = [];
  idTarjeta: number = 0;
  cantidad: number = 500;
  cardNumber: string = '' ;
  tarjeta: Tarjeta | null = null;

  constructor(private tarjetaService: TarjetaService,private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(): void {
    this.tarjetaService.getTarjetas().subscribe(data => {
      this.tarjetas = data.map(tarjeta => ({
        ...tarjeta,
        creacion: this.datePipe.transform(tarjeta.creacion, 'yyyy-MM-dd HH:mm:ss') // Formatea la fecha correctamente
      }));
    });
  }

  crearTarjeta(saldo: number, card_number: number): void {
    this.tarjetaService.createTarjeta(saldo,card_number ).subscribe(response => {
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
  
  searchCard(card_number: string): void {
    if (card_number) {
      const cardNumberNum = Number(card_number);
      if (!isNaN(cardNumberNum)) {
        this.tarjetaService.getTarjeta(cardNumberNum).subscribe(
          (data: Tarjeta) => {
            this.tarjetas = [{
              ...data,
              creacion: this.datePipe.transform(data.creacion, 'yyyy-MM-dd HH:mm:ss') // Formatea la fecha correctamente
            }];
            console.log(this.tarjeta);
          },
          error => {
            console.error('Error fetching card:', error);
            Swal.fire(`No se puede encontrar la tarjeta ${card_number}`, '', 'info');
          }
        );
      } else {
        Swal.fire('Error', 'Por favor ingrese un número de tarjeta válido', 'error');
      }
    } else {
      this.obtenerTarjetas(); // Muestra todas las tarjetas si el campo está vacío
    }
  }
  
  openAddCardForm() {
    Swal.fire({
      title: 'Agregar Tarjeta',
      html: `
        <form id="addCardForm">
          <div class="form-floating mb-3">
          <input type="text" class="form-control" id="cardNumber" placeholder="Ingrese el número de tarjeta" required>
            <label for="cardNumber" >Número de Tarjeta</label>
          </div>
          <div class="form-floating">
          <input type="number" class="form-control" id="cardBalance" placeholder="Ingrese el saldo" required>
            <label for="cardBalance" >Saldo</label>
          </div>
        </form>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      preConfirm: () => {
        const cardNumber = (Swal.getPopup()!.querySelector('#cardNumber') as HTMLInputElement).value;
        const cardBalance = (Swal.getPopup()!.querySelector('#cardBalance') as HTMLInputElement).value;
        if (!cardNumber || !cardBalance) {
          Swal.showValidationMessage('Por favor, ingrese todos los datos');
        }
        return { cardNumber: cardNumber, cardBalance: cardBalance };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Guardado!", "", "success");
        const { cardNumber, cardBalance } = result.value;
        this.crearTarjeta(cardBalance, cardNumber);
      }else {
        Swal.fire('Operación cancelada', '', 'info');
      }
    });
  }

  editCard(card: Tarjeta) {
    Swal.fire({
      title: 'Tarjeta N° ' + card.card_number,
      html: `
        <form id="addCardForm">
          <div class="form-floating">
            <input type="number" class="form-control" id="cardBalance" placeholder="Ingrese el saldo">
            <label for="cardBalance" >Saldo </label>
          </div>
          <div class="mb-3">
            <button type="button" class="btn btn-success" onclick="document.getElementById('cardBalance').value=500">$500</button>
            <button type="button" class="btn btn-success" onclick="document.getElementById('cardBalance').value=1000">$1000</button>
            <button type="button" class="btn btn-success" onclick="document.getElementById('cardBalance').value=1500">$1500</button>
            <button type="button" class="btn btn-success" onclick="document.getElementById('cardBalance').value=2000">$2000</button>
          </div>
        </form>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Recargar',
      preConfirm: () => {
        const cardBalance = (Swal.getPopup()!.querySelector('#cardBalance') as HTMLInputElement).value;
        if (!cardBalance) {
          Swal.showValidationMessage('Ingrese un monto');
        }
        this.cantidad = parseInt(cardBalance);
        this.idTarjeta = card.id;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Recargaste! $" + this.cantidad, "", "success");
        this.recargarSaldo();
      } else {
        Swal.fire('Operación cancelada', '', 'info');
      }
    });
  }

}
