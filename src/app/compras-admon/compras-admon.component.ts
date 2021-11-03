import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../produto/producto.service';
import { Compra } from '../produto/compra';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-admon',
  templateUrl: './compras-admon.component.html',
  styleUrls: ['./compras-admon.component.css']
})
export class ComprasAdmonComponent implements OnInit {

  compras:Compra[] = [];
  direccion:string[] = [];
  constructor(protected productoService: ProductoService, protected router:Router) { 
    try {
      this.productoService.getAllCompras().subscribe(
        compras =>  {
          this.compras = compras;
          this.compras.map(c => c.fecha = c.fecha.substring(0,10));
          this.compras = this.compras.map(c => c = c).reverse();
          console.log(this.compras);
        }
      );
    } catch (error) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    
  }

  enviar(id,enviado){
    console.log(id);
    console.log(enviado);
    this.productoService.enviarCompra(id,enviado).subscribe(
      compra => console.log(compra)
    );
    this.productoService.getAllCompras().subscribe(
      compras =>  {
        this.compras = compras;
        this.compras.map(c => c.fecha = c.fecha.substring(0,10));
        this.compras = this.compras.map(c => c = c).reverse();
        
        this.productoService.notificarCompras.emit(this.compras);
        console.log(this.compras);
      }
    );
  }

}
