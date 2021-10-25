import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../produto/producto';
import { ProductoService } from '../produto/producto.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  productos: Producto[];
  constructor(protected activatedRoute: ActivatedRoute, protected productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    this.activatedRoute.params.subscribe(params => {
      let term = params['term'];
      if(term){
        this.productoService.buscarPorNombre(term).subscribe( productos => {
          this.productos = productos
        })
      }
    })

  }

}
