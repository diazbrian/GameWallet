import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User, Usuario } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  listUsers: Usuario[] = [];

  constructor(
    private _authGoogleService: AuthGoogleService,
    private toastr: ToastrService,
    private _userServices: UserService
  ) {
  }

  ngOnInit() {
    this.successLogin();
  }

  successLogin() {
    setTimeout(() => {
      const profile = this._authGoogleService.getProfile();
      if (profile) {
        const name = profile['name'];
        const email = profile['email'];
        const fullname = profile['name'].replace(/\s/g, '')
        this._userServices.getUsers().subscribe(data => {
          const user = data.find(user => user.email === email);
          console.log(user)
          if (!user) {
            console.log('creando Usuario');
            const newUser: User = {
              nombre: fullname,
              email: email,
              contraseña: fullname,
              telefono: 0,
              rol: "empleado",
            }
            this._userServices.signIn(newUser).subscribe({
              next: (res) => {
                console.log(res)
                console.log('Usuario creado');
              },
              error: (err: HttpErrorResponse) => {
                console.log('Error al crear usuario');
                console.log(err)
              }
            })
          } else {
            console.log('existe usuario');
          }
        })
        this.toastr.success(`${name}`, 'Bienvenido');
      }
    }, 1000);
  }

}
