import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, Usuario } from '../../interfaces/user';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  providers: [DatePipe]

})
export class UsuariosComponent {

  // listUsers se usa en  './usuarios.component.html'
  listUsers: Usuario[] = [];

  constructor(private _userServices: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userServices.getUsers().subscribe(data => {
      this.listUsers = data.map(user => {
        return {
          ...user,
          creacion: this.datePipe.transform(user.creacion, 'yyyy-MM-dd HH:mm:ss')
        };
      });
    });
  }

  editUser(user: Usuario): void {
    // Lógica para editar el usuario
    console.log('Editar usuario:', user);
  }

  deleteUser(user: Usuario): void {
    this.confirmDelMsg(user);
  }

  confirmDelMsg(user: Usuario) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
      text: "nombre: " + user.nombre + ", id: " + user.id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userServices.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire({
              title: "Eliminado!",
              text: "El usuario ha sido eliminado con exito.",
              icon: "success"
            });
            // Actualizar la lista de usuarios
            this.listUsers = this.listUsers.filter(u => u.id !== user.id);
          },
          error: (err: HttpErrorResponse) => {
            Swal.fire({
              title: "Error",
              text: err.error.message,
              icon: "error"
            });
          }
        })
      }
    });
  }
}
