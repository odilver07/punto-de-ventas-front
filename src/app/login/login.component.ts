import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario;
  error: number;
  constructor(protected authService: AuthService, protected router: Router) {
    this.usuario =  new Usuario();
   }

  ngOnInit(): void {
    // this.errorLogin(this.error);
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/productos']);
    }
  }

  login():void {
    if(this.usuario.username == null || this.usuario.password == null){
      Swal.fire('Error login', '${password} is already used by Odi07 ', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      console.log(usuario);
      this.authService.notificarLongin.emit(usuario);
      this.router.navigate(['/productos'])
    }, err => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Password o usuario incorrecto',
        showConfirmButton: false,
        timer: 1500
      })
      this.errorLogin(err.status);
    });
  }

  errorLogin(err):void{
    if(err == 400){
      this.error = 400;
      setTimeout(() => {
        this.error = null;
        console.log(this.error);
      }, 2500) 
    }
  }  
}
