import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../produto/producto.service';
import { Producto } from '../produto/producto';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-admon',
  templateUrl: './producto-admon.component.html',
  styleUrls: ['./producto-admon.component.css']
})
export class ProductoAdmonComponent implements OnInit {
  productos: Producto[];
  constructor(private productoService: ProductoService, protected router: Router) { }


  ngOnInit(): void {
    this.productoService.getProductos().subscribe(
      producto => this.productos = producto
    );
  }

  delete(producto:Producto):void{

    Swal.fire({
      title: 'Desea eliminar el producto?',
      text: "Mo podra recuperalo despues de borrarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.delete(producto.id).subscribe( response => {
          this.productos =  this.productos.filter(p => p !== producto);
          Swal.fire(
            'Eliminado!',
            `El producto ${producto.nombre} fue eliminado con exito`,
            'success'
          );
        });
      }
    });
  }
}
