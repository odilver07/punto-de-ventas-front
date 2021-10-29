import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  private _notificarLogin =  new EventEmitter<Usuario>();

  constructor(protected http: HttpClient) { }

  get notificarLongin():EventEmitter<Usuario>{
    return this._notificarLogin
  }

  public get usuario():Usuario{
    if(this._usuario != null){
      return this._usuario;
    } else if(this.usuario == null && sessionStorage.getItem('usuario')){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario
    }
    return new Usuario();
  }

  public get token():string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('item') != null){
      this._token = JSON.parse(sessionStorage.getItem('token'));
      return this.token;
    }
    return null;
  }

  login(usuario: Usuario):Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';
    const credenciales = btoa('angularapp'+':'+'12345');
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
            'Authorization':'Basic '+credenciales});
    let params  = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(urlEndPoint, params.toString(), {headers: httpHeaders});
  }

  crearUsuario(usuario: Usuario):Observable<Usuario>{
    const urlEndPoint = 'http://localhost:8080/api/save/user'
    return this.http.post<Usuario>(urlEndPoint,usuario);
  }

  guardarUsuario(accessToken: string):void{
    let payload = this.obtenerDatosToken(accessToken);
    // aqui estan los datos
    console.log(payload);
    this._usuario =  new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    this._usuario.email = payload.email;
    this._usuario.carritoid = payload.carritoid;
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.direccion = payload.direccion;
    this._usuario.codigo = payload.codigo;
    this._usuario.id = payload.id;
    console.log(this._usuario);
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  guardarToken(accessToken: string):void{
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken:string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }

  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear()
  }

  hasRole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
}
