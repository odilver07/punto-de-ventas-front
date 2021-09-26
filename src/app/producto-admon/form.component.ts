import { Component, OnInit } from '@angular/core';
import { Producto } from '../produto/producto';
import { ProductoService } from '../produto/producto.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  producto: Producto = new Producto();
  constructor(private productoService: ProductoService,
    protected router: Router,
    protected activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.productoService.getProducto(id).subscribe( (producto => this.producto = producto))
      }
    })
  }

  public create():void{
    this.productoService.create(this.producto).subscribe(
      response => {
        this.router.navigate(['/productos']);
        Swal.fire('Nuevo producto',`Se agrego el producto ${response.nombre}`,'success'); 
      }
    )
  }

  update():void{
    this.productoService.update(this.producto).subscribe( response => {
      this.router.navigate(['/productos/admon']);
      Swal.fire('Producto actualizado',`Producto ${response.nombre} con exito`,'success'); 
    })
  }

}
