import { Component, OnInit } from '@angular/core';
import { Usuario } from '../login/usuario';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Compra } from '../produto/compra';
import { ProductoService } from '../produto/producto.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  usuario:Usuario;
  compras:Compra[];
  constructor(private authService: AuthService, protected router: Router, private productoService: ProductoService) {
    
    try{
      this.usuario =  this.authService.usuario;
      
      this.productoService.getCompras(this.usuario.id).subscribe( compras => {
        this.compras = compras;
        this.compras =  this.compras.map(c =>  c = c).reverse();
        this.compras.map( c => c.fecha = c.fecha.substring(0,10));
      })
    }catch(e){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit(): void {
  }

}
