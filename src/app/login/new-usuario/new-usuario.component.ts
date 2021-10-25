import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(protected authService: AuthService, protected router: Router) { 
    this.usuario =  new Usuario();
    this.usuario.enable = true;
  }
  
  ngOnInit(): void {
  }

  crearUsuario():void{
    this.authService.crearUsuario(this.usuario).subscribe( usuario => {
      console.log(usuario);
      this.router.navigate(['/login']);
      Swal.fire('Usuario creado', 'success');
    });
  }

  click():void{
    console.log(this.usuario);
  }

}
