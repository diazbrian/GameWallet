import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';

// Animaciones
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { FlipCardFrontComponent } from './components/dashboard/flip-card-front';
import { FlipCardBackComponent } from './components/dashboard/flip-card-back';

// Modulos
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
//import { DashboardModule } from './components/dashboard/dashboard.module';
import { DolarComponent } from './components/dolar/dolar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    FooterComponent,
    UsuariosComponent,
    TarjetasComponent,
    FlipCardFrontComponent, FlipCardBackComponent,
    DolarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    //DashboardModule
    SwiperModule,
  ],
  exports: [DashboardComponent, FlipCardFrontComponent, FlipCardBackComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
