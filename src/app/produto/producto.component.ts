import { Component, OnInit } from '@angular/core';
import { Item } from './item';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { AuthService } from '../login/auth.service';
import { Carrito } from './carrito';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  producto: Producto;
  item: Item;
  carrito:Carrito;
  constructor(private productoService:ProductoService, public authService: AuthService, protected router: Router) { 
    
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      productos => this.productos = productos
    );
  }

  click(id):void{
    
    try{
    console.log(id);
      let idCar = this.authService.usuario.carritoid;
      this.productoService.getCarrito(idCar).subscribe( carrito => {
        let encontrado = false;
        let idEnc = 0;
        let iterador = 0;
        while(encontrado==false && iterador < carrito.items.length){
          if(carrito.items[iterador].producto.id == id){
            encontrado = true;
            idEnc = id;
            console.log(id+' aqui el iditem');
          }
        iterador++;
      }
      console.log(encontrado);
      if(encontrado === true){
        this.carrito =  new Carrito();
        this.carrito.id = idCar;
        this.item = new Item();
        this.item.cantidad = 1;
        this.item.id = id;
        console.log(this.item.id);
        this.carrito.items.push(this.item);
        this.productoService.updateCarrito(this.carrito).subscribe( c => {
          console.log(c);
          this.productoService.notificarCarrito.emit(this.carrito);
        });
        this.producto = null;
        this.item = null;
        this.carrito = null;
        this.router.navigate(['/productos']);
        return;
      }

      if(encontrado===false){
        this.productoService.getProducto(id).subscribe( producto => {
        this.item = new Item();
        this.item.cantidad = 1;
        this.item.producto = producto;
        console.log(this.item);
        this.productoService.saveItem(this.item).subscribe( item => {
          this.carrito =  new Carrito();
          this.carrito.id = idCar;
          console.log(idCar);
          this.carrito.items.push()
          this.carrito.items.push(item);
          console.log(item.producto.id);
          this.productoService.updateCarrito(this.carrito).subscribe( c => {
            console.log(c);
            this.productoService.notificarCarrito.emit(this.carrito);
            this.producto = null;
            this.item = null;
            this.carrito = null;
            this.router.navigate(['/productos']);
            return;
          });
        })
      })
      }
      });
    }catch(e){
      console.log('Inicie sesion');
    }
  }

}
