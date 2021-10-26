import { Carrito } from '../produto/carrito';
export class Usuario {
    id : number;
    username: string;
    password: string;
    enable: boolean;
    email: string;
    roles: string[] = [];
    carritoid: number;
    nombre: string;
    apellido: string;
    direccion: string;
    codigo: number;
}
