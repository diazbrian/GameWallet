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

  // Formulario para editar un usuario
  openEditUserForm(user: Usuario) {
    Swal.fire({
      title: 'Editar Usuario',
      html: `
        <form id="addCardForm">
          <div class="form-floating">
            <input type="text" class="form-control" id="nombre" placeholder="Ingrese nombre" value="${user.nombre}">
            <label for="nombre" >Nombre</label>
          </div>

          <div class="form-floating">
            <input type="email" class="form-control" id="email" placeholder="Email" value="${user.email}">
            <label for="email" >Email</label>
          </div>

          <div class="form-floating ">
            <input type="password" class="form-control" id="password" placeholder="Ingrese contraseña" value="${user.contraseña}">
            <label for="password" >Contraseña</label>
            <i class="bi bi-eye-slash position-absolute" id="showPassword" style="right: 10px; top: 35%; cursor: pointer;"></i>
          </div>

          <div class="form-floating">
            <input type="number" class="form-control" id="telefono" placeholder="Ingrese telefono" value="${user.telefono}">
            <label for="telefono" >Telefono</label>
          </div>

          <div class="form-group">
            <select id="rol" class="form-select">
              <option value="${user.rol}" disabled selected>Seleccione el rol</option>
              <option value="admin">Admin</option>
              <option value="empleado">Empleado</option>
            </select>
          </div>
          </script>
        </form>
      `,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#198754',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc3545',
      preConfirm: () => {
        const nombre = (Swal.getPopup()!.querySelector('#nombre') as HTMLInputElement).value;
        const email = (Swal.getPopup()!.querySelector('#email') as HTMLInputElement).value;
        const contraseña = (Swal.getPopup()!.querySelector('#password') as HTMLInputElement).value;
        const telefono = parseInt((Swal.getPopup()!.querySelector('#telefono') as HTMLInputElement).value)
        const rol = (Swal.getPopup()!.querySelector('#rol') as HTMLInputElement).value;

        this.editingUser = {
          id: user.id,
          nombre: nombre,
          email: email,
          contraseña: contraseña,
          telefono: telefono,
          creacion: user.creacion,
          rol: rol
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
          this.saveUser();
      } else {
        this.editingUser = null;
        Swal.fire('Operación cancelada', '', 'info');
      }
    });

    document.getElementById('showPassword')!.addEventListener('click', function() {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      const icon = document.getElementById('showPassword') as HTMLElement;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      }
    });
  }

  deleteUser(user: Usuario): void {
    this.confirmDelMsg(user);
  }

  saveUser(): void {
    this._userServices.updateUser(this.editingUser?.id!, this.editingUser!).subscribe({
      next: () => {
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

  // confirmar eliminacion
  confirmDelMsg(user: Usuario) {
    Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
      html: `
        <p>ID: <b>${user.id}</b></p>
        <p>Nombre: <b>${user.nombre}</b></p>
        <p>Usuario: <b>${user.email}</b></p>
        <p>Rol: <b>${user.rol}</b></p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
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
            // Actualiza la lista de usuarios en el frontend sin hacer una solicitud al backend
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
