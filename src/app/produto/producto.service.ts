import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Observable, of ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint = 'http://localhost:8080/api/productos';
  private httpHeaders =  new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient, protected router: Router) { }

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

  create(producto: Producto): Observable<any> {
    return this.http.post<Producto>(this.urlEndPoint, producto,{headers: this.httpHeaders} ).pipe(
      catchError(e => {
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
    return this.http.put<Producto>(`${this.urlEndPoint}/${producto.id}`,producto,{headers:this.httpHeaders}).pipe(
      catchError( e => {
        Swal.fire('Error', e.error.mensaje, 'error');
        return throwError(e);
      })
    )
  }

  delete(id: number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders});
  }
}
