import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, Usuario } from '../../interfaces/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  // listUsers se usa en  './usuarios.component.html'
  listUsers: Usuario[] = [];

  constructor( private _userServices: UserService){}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userServices.getUsers().subscribe(data => {
      this.listUsers = data;
      console.log(data);
    });
  }
}
