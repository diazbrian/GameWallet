import { Component } from '@angular/core';
import { AuthGoogleService } from '../../services/auth-google.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(
    private _authGoogleService: AuthGoogleService,
    private toastr: ToastrService,
    private router: Router
  ) {}


  logout() {
    this._authGoogleService.logout();
    this.toastr.info('Has cerrado la sesion', 'Sesion Cerrada');
    this.router.navigate(['/login']);
  }
}
