import { Component, OnInit } from '@angular/core';
import { Carrito } from '../produto/carrito';
import { Compra } from '../produto/compra';
import { Usuario } from '../login/usuario';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { ProductoService } from '../produto/producto.service';
import Swal from 'sweetalert2';

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
  asentamiento:any[] = [];
  colonia:any;
  numeroCasa:string;
  calle:string;
  cp:number;


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
        if(this.carrito.totalCarrito <= 0){
          Swal.fire({
            title: 'El carrito esta vacio',
            background: '#040404',
            imageUrl: 'http://localhost:8080/api/uploads/img/alto-ahi-loca.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image'
          })
          this.router.navigate(['/carrito'])
        }
      }
    );
  }

  comprar():void{
    if(this.asentamiento[0].response.municipio == undefined && this.colonia == undefined && this.numeroCasa == undefined  && this.calle == undefined){
      console.log('Agregue todos los campos');
      return;
    }

    const direccion = 'Colonia: '+this.colonia+' - '+'Estado: '+this.asentamiento[0].response.estado+' - '+'Municipio: '
    + this.asentamiento[0].response.municipio+' - '+'Calle: '+this.calle+' - '+'Numero de casa: '+this.numeroCasa+' - '+'Codigo postal: '+ this.cp;
    this.compra =  new Compra();
    this.user2 =  new Usuario();
    this.user2.id = this.usuario.id;
    this.compra.items = this.carrito.items;
    this.compra.totalCompra =  this.carrito.totalCarrito;
    this.compra.usuario = this.user2;
    console.log(this.compra);
    console.log(this.cp);
    if(this.cp != undefined){
      this.productoService.saveCompra(this.compra).subscribe(
        compra => {console.log(compra);
          this.productoService.notificarCarrito.emit(this.carrito);
        this.router.navigate(['/mis/compras'])
        }
      );
      this.productoService.actualizarUsuario(this.authService.usuario.id, direccion).subscribe(
        user => {
          console.log(user);
        }
      )
    }
  }

  buscarCp(){
    if(this.cp == null){
      console.log('Agregue caodigo postal valido');
      return;
    }
    const cpString = this.cp+'';
    if(cpString.length !=5){
      console.log('El codigo postal debe tener 5 digitos');
      return;
    }
      this.productoService.getCiudadCP(this.cp).subscribe( cp => {
        console.log(cp);
        this.asentamiento = cp;
      });
  }

}
