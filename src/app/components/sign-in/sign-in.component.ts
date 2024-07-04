import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})

// imput src\app\components\sign-in\sign-in.component.html
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userServices: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void { }

  addUser() {
    // Validacion
    if (this.username == '' || this.password == '' || this.confirmPassword == '') {
      this.toastr.error('Llena todos los campos', 'Error');
      return;
    }
    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Errror');
      return;
    }

    // Crear usuario
    const user: User = {
      nombre: this.username,
      email: 'xkT5S@example.com',
      contraseña: this.password,
      telefono: 888,
      rol: 'empleado'
    }

    console.log(user);

    // spinner (animacion cargando)
    this.loading = true;

    this._userServices.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success(`Usuario  ${this.username} registrado`, 'Éxito');
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msgError(err)
      },
      complete: () => console.info('complete')
    })
  }
}
