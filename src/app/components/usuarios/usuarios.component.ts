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

  // variables extra para el componente porque no se reconoce [ñ] en el html
  password: string = '';

  // listUsers se usa en  './usuarios.component.html'
  listUsers: Usuario[] = [];
  editingUser: Usuario | null = null;

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

  //
  // editUser(user: Usuario): void {
  //   this.imputForm(user, user.id);
  // }

  deleteUser(user: Usuario): void {
    this.confirmDelMsg(user);
  }

  toggleEditForm(user: Usuario): void {
    if (this.editingUser && this.editingUser.id === user.id) {

      // muestra la contrasena actual del usuario en el componente
      this.password = user.contraseña;

      this.editingUser = null;
    } else {
      this.password = user.contraseña;
      this.editingUser = { ...user };
    }
  }

  saveUser(): void {
    // asigna la componente password a editingUser.contraseña
    // (no es posible hacer this.editingUser.contraseña = this.password)
    this.editingUser?.contraseña ? this.editingUser.contraseña = this.password : null;

    console.log(this.editingUser, this.editingUser?.id);

    this._userServices.updateUser(this.editingUser?.id!, this.editingUser!).subscribe({
      next: () => {
        // TODO: modularizar mensajes en service
        // pasar string `guardado` o `eliminado` por parametro
        Swal.fire({
          title: "Guardado!",
          text: "El usuario ha sido actualizado con exito.",
          icon: "success"
        });
        this.getUsers();
        this.editingUser = null;
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

  cancelEdit(): void {
    this.editingUser = null;
  }

  // imputForm(user: User, id: number) {
  //   user.nombre = "juan";
  //   console.log(user, id);
  //   this._userServices.updateUser(id, user).subscribe();
  // }

  // confirmar eliminacion
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
            // TODO: modularizar mensajes en service
            // pasar string `guardado` o `eliminado` por parametro
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
