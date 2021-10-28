import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';
import { ProductoService } from '../produto/producto.service';
import { Carrito } from '../produto/carrito';
import { Router } from '@angular/router';
import { Item } from '../produto/item';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  usuario:Usuario;
  carrito: Carrito;
  items:Item[] = [];
  constructor(private authService: AuthService, protected productoService: ProductoService, protected router: Router) {
    try{
      this.usuario = authService.usuario;
    }catch(e){
      this.router.navigate(['/login'])
    }
    
    
  }

  ngOnInit(): void {
    this.obtenerCarrito();
  }

  obtenerCarrito():void{
    this.productoService.getCarrito(this.usuario.carritoid).subscribe( c => {
      this.carrito = c;
      console.log(this.carrito);
      this.items = this.carrito.items;
    })
  }

  save(event){
    console.log(event);
    let carritoNew =  new Carrito();
    carritoNew.id =  this.carrito.id;
    event.cantidad = 1;
    carritoNew.items.push(event)
    this.productoService.updateCarrito(carritoNew).subscribe( c => console.log(c))
    this.obtenerCarrito();
  }

  delete(event){
    console.log(event);
    let carritoNew =  new Carrito();
    carritoNew.id =  this.carrito.id;
    event.cantidad = -1;
    carritoNew.items.push(event)
    this.productoService.updateCarrito(carritoNew).subscribe( c => console.log(c))
    this.obtenerCarrito();
  }

}
