import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../produto/producto.service';
import { Producto } from '../produto/producto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vista-producto',
  templateUrl: './vista-producto.component.html',
  styleUrls: ['./vista-producto.component.css']
})
export class VistaProductoComponent implements OnInit {

  producto : Producto =  new Producto();
  constructor(private productoService: ProductoService,
    protected router: Router, protected activatedR: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente():void {
    this.activatedR.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.productoService.getProducto(id).subscribe( producto => this.producto = producto);
      }
    })
  }

}
