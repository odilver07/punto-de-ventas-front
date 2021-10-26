import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable, of ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Marca } from './marca';
import { AuthService } from '../login/auth.service';
import { Item } from './item';
import { Carrito } from './carrito';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint = 'http://localhost:8080/api/productos';
  private urlEndPoint2 = 'http://localhost:8080/api';
  private httpHeaders =  new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient, 
    protected router: Router
    ,protected authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+token)
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {

    if(e.status==403 || e.status==401){
      Swal.fire({
        title: 'Acceso restringido.',
        background: '#040404',
        imageUrl: 'http://localhost:8080/api/uploads/img/alto-ahi-loca.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      this.router.navigate(['/productos'])
      return true;
    }

    return false;
  }

  getProductosPorPagina(page: Number):Observable<any>{
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map( (response: any) => {
        (response.content as Producto[]).map(producto => {
          return producto;
        });
        return response;
      })
    )
  }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }
  // Aqui cambiamos el headers checar si da error
  create(producto: Producto): Observable<any> {
    return this.http.post<Producto>(this.urlEndPoint, producto,{headers: this.agregarAuthorizationHeader()} ).pipe(
      catchError(e => {

        if(this.isNoAutorizado(e)){
          return throwError(e);
        }

        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  getProducto(id):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        this.router.navigate(['/productos']);
        return throwError(e);
      })
    );
  }

  update(producto:Producto):Observable<any>{
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`,producto,{headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  updateCarrito(carrito:Carrito):Observable<Carrito>{
    return this.http.put<Carrito>(`${this.urlEndPoint2}/carrito/save`,carrito,{headers: this.agregarAuthorizationHeader()});
  }

  delete(id: number):Observable<any>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`,{headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return e;
      })
    );
  }

  subirFoto(archivo: File, id): Observable<any>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id",id);

    let httpHeaders =  new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    return this.http.post<Producto>(`${this.urlEndPoint}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    }).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }

  buscarPorNombre(term): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.urlEndPoint}/disponibles/${term}`);
  }

  getMarcas():Observable<Marca[]>{
    return this.http.get<Marca[]>(this.urlEndPoint2+'/marcas')
  }

  getCarrito(id): Observable<Carrito>{
    return this.http.get<Carrito>(`${this.urlEndPoint2}/carrito/${id}`,{headers: this.agregarAuthorizationHeader()})
  }

  saveItem(item: Item):Observable<any>{
    return this.http.post<any>(this.urlEndPoint2+'/item',item, {headers: this.agregarAuthorizationHeader()} );
  }
}
