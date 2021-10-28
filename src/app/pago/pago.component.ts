import { Component, OnInit } from '@angular/core';
import { Carrito } from '../produto/carrito';
import { Compra } from '../produto/compra';
import { Usuario } from '../login/usuario';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { ProductoService } from '../produto/producto.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  usuario:Usuario;
  user2:Usuario;
  carrito:Carrito;
  compra:Compra;
  constructor(private authService:AuthService,protected router:Router,private productoService:ProductoService) { 
    try{
      this.usuario = authService.usuario;
      console.log(this.usuario);
    }catch(e){
      this.router.navigate(['/login'])
    }
  }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito():void{
    this.productoService.getCarrito(this.usuario.carritoid).subscribe(
      carrito => {
        this.carrito = carrito;
        console.log(this.carrito);
      }
    );
  }

  comprar():void{
    this.compra =  new Compra();
    this.user2 =  new Usuario();
    this.user2.id = this.usuario.id;
    this.compra.items = this.carrito.items;
    this.compra.totalCompra =  this.carrito.totalCarrito;
    this.compra.usuario = this.user2;
    console.log(this.compra);
    console.log(this.user2);
    this.productoService.saveCompra(this.compra).subscribe(
      compra => console.log(compra)
    )
  }

}
