import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../produto/producto.service';
import { Producto } from '../produto/producto';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from '../produto/marca';


@Component({
  selector: 'app-producto-admon',
  templateUrl: './producto-admon.component.html',
  styleUrls: ['./producto-admon.component.css']
})
export class ProductoAdmonComponent implements OnInit {
  productos: Producto[];
  paginador: any;

  constructor(private productoService: ProductoService, protected router: Router,
    protected activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page');

      if(!page){
        page = 0;
      }
      this.productoService.getProductosPorPagina(page)
    .subscribe(
      producto => {
        this.productos = producto.content as Producto[];
        this.paginador = producto;
      }
    );
  });

 }

  delete(producto:Producto):void{

    Swal.fire({
      title: 'Desea eliminar el producto?',
      text: "No podra recuperalo despues de borrarlo",
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
            `El producto fue eliminado con exito`,
            'success'
          );
        });
      }
    });
  }
}
