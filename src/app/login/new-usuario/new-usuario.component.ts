import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css']
})
export class NewUsuarioComponent implements OnInit {
  usuario:Usuario;
  passwordV:string;
  constructor(protected authService: AuthService, protected router: Router) { 
    this.usuario =  new Usuario();
    this.usuario.enable = true;

  }
  
  ngOnInit(): void {
  }

  crearUsuario():void{
    if(this.usuario.email == undefined || this.usuario.username.trim() == '' 
    || this.usuario.nombre.trim() == '' || this.usuario.apellido.trim() == ''){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Agregue todos los datos',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    if(this.usuario.password != this.passwordV){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Las contrasenas no coinciden',
        showConfirmButton: false,
        timer: 1500
      })
      return;
    }
    try{
      this.authService.crearUsuario(this.usuario).subscribe();
      this.router.navigate(['/login']);
      Swal.fire('Usuario creado', 'success');
    }catch(e){
      console.log(e);
      this.router.navigate(['/login']);
      Swal.fire('Error', 'success');
    }
  }

  click():void{
    console.log(this.usuario);
  }

}
