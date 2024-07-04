import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _userServices: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {}

  login() {

    // Validacion
    if (this.username == '' || this.password == '') {
      this.toastr.error('Llena todos los campos', 'Error');
      return;
    }

    const user = {
      nombre: this.username,
      contraseña: this.password,
    }

    this.loading = true;
    this._userServices.login(user).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this._errorService.msgError(err)
        this.loading = false;
      },
      complete: () => console.info('complete')
    })

  }

}
