import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';
import { Carrito } from '../produto/carrito';
import { ProductoService } from '../produto/producto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  term: string;
  cantidad:number;
  usuario:Usuario;
  carrito:Carrito;
  cantidadPendientes:number = 0;
  constructor(public authService: AuthService, protected router:Router,private productoService:ProductoService) {
   }

  ngOnInit(): void {
    this.productoService.notificarCarrito.subscribe(
      carrito => this.productoService.getCarrito(carrito.id).subscribe(
        carrito => {
          this.cantidad = carrito.items.length;
          console.log(this.cantidad);
        }
      )
    );
    this.authService.notificarLongin.subscribe(
      usuario => {
        this.productoService.getCarrito(usuario.carritoid).subscribe(
          carrito => {
            this.cantidad = carrito.items.length;
            console.log(this.cantidad);
          }
        )
      }
    );
    this.productoService.notificarCompras.subscribe( compras => {
      this.cantidadPendientes = 0;
      compras.forEach( c => {
        if(c.enviado == 0){
          this.cantidadPendientes++;
        }
      })
    })
  }

  logout():void{
    this.authService.logout();
    Swal.fire({
      position: 'center',
      background:'#2e2926',
      title: '<span class="fs-1 text-white">PokerCel</span><i class="bi bi-suit-club-fill" style="color: white;"> <br>'
             +'<i class="bi bi-suit-club-fill" style="color: green;"></i><i class="bi bi-suit-diamond-fill" style="color: #ff00ff;"></i>'
             +'<i class="bi bi-suit-heart-fill" style="color: #ff0000;"></i><i class="bi bi-suit-spade-fill" style="color: black;"></i> <br>'
             +'<span class="fs-5">Se ha cerrado sesion correctamente</span>',
      showConfirmButton: false,
      icon: 'success',
      timer: 1500
    })
    this.router.navigate(['/login'])
  }

  buscar():void{
    if(this.term == null){
      this.term = 'redmi'
    }
    this.router.navigate([`/productos/disponibles/${this.term}`]);
  }

}
