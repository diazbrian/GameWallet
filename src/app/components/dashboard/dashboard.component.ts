import { Component, Input, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, SwiperOptions, Swiper } from 'swiper';
import { interval } from 'rxjs';
import { AuthGoogleService } from '../../services/auth-google.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { User, Usuario } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  toggleProperty = false;

  toggle() {
    this.toggleProperty = !this.toggleProperty;
  }

  config: SwiperOptions = {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
  };
  slides = [
    {
      image: '../../../assets/img/tarjeta-personalizada1.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-personalizada2.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-personalizada3.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina1.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina2.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina3.jpg',
    },
  ];
  slides2 = [
    {
      image: '../../../assets/img/seleccion1.jpg',
    },
    {
      image: '../../../assets/img/seleccion2.jpg',
    },
    {
      image: '../../../assets/img/seleccion3.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina1.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina2.jpg',
    },
    {
      image: '../../../assets/img/tarjeta-argentina3.jpg',
    },
  ];

  automatico(swiper: Swiper){
    const segundos = interval(5000);
    segundos.subscribe(() => {
      swiper.slideNext();
    })
  }

  listUsers: Usuario[] = [];

  constructor(
    private _authGoogleService: AuthGoogleService,
    private toastr: ToastrService,
    private _userServices: UserService
  ) {
  }

  ngOnInit() {
    const profile = this._authGoogleService.getProfile();
    // NOTA:
    // se ejecuta solo despues de iniciar sesion con google
    // despues de la primera vez 'profile' no estara null por que google ya tendra cargado el 'profile' del usuario
    if (!profile) {
      this.successLogin();
    }
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
