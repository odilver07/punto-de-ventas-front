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
  private fotoSeleccionada: File;

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
        this.productoService.getProducto(id).subscribe( (producto => this.producto = producto));
      }
    })
  }

  public create():void{
    this.producto.descripcion = !this.producto.descripcion && this.producto.nombre?
    this.producto.nombre:this.producto.descripcion;

    console.log(this.producto);

    this.productoService.create(this.producto).subscribe(
      json => {
        if(this.fotoSeleccionada){
          this.productoService.subirFoto(this.fotoSeleccionada,json.producto.id)
          .subscribe( p => this.producto = p);
        }
        this.router.navigate(['/productos/admon/page/0']);
        Swal.fire('Nuevo producto',`${json.mensaje}: ${json.producto.nombre}`,'success'); 
      }
    )
  }

  update():void{
    this.productoService.update(this.producto).subscribe( json => {
      this.router.navigate(['/productos/admon/page/0']);
      Swal.fire('Producto actualizado',`${json.mensaje} ${json.producto.nombre}`,'success'); 
    });
    
    if(this.fotoSeleccionada){
      this.productoService.subirFoto(this.fotoSeleccionada,this.producto.id)
      .subscribe( p => this.producto = p);
    }
  }

  seleccionarFoto(event){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }


}
