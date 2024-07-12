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

  profileImage: string = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor(
    private _authGoogleService: AuthGoogleService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.getProfile();
    }, 1000);
  }

  logout() {
    this._authGoogleService.logout();
    this.toastr.info('Has cerrado la sesion', 'Sesion Cerrada');
    this.router.navigate(['/login']);
  }


  getProfile() {
    const profile = this._authGoogleService.getProfile();
    if (profile) {
      console.log(profile['picture']);
      this.profileImage = profile['picture'];
    }
  }

}
